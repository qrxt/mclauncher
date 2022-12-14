use crate::{
    client::{launcher_client::LauncherClient, log::log_mc_line},
    domain::{
        os::OS,
        vanilla::download::load_asset_index,
        vanilla::download::load_version_manifest,
        vanilla::download::load_versions_manifest,
        vanilla::get::get_required as get_vanilla_required,
        vanilla::launch::launch as launch_vanilla,
        version::{AssetsIndex, Download, VersionManifest},
    },
    downloader::download_manager::Downloader,
    launcher_config::config::{
        get_instance_path, get_libraries_path, get_libraries_str, get_libraries_string_file_path,
        get_version_path,
    },
    utils::get_libs_list::get_libraries_list,
};
use log::{error, info};
use serde::{Deserialize, Serialize};
use std::{
    io::{self, BufRead, BufReader, ErrorKind},
    process::Child,
    str::FromStr,
};
use thiserror::Error;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum InstanceSubtype {
    Vanilla,
    Forge,
}

impl FromStr for InstanceSubtype {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "vanilla" => Ok(InstanceSubtype::Vanilla),
            "forge" => Ok(InstanceSubtype::Forge),
            _ => Err(()),
        }
    }
}

impl ToString for InstanceSubtype {
    fn to_string(&self) -> String {
        match self {
            InstanceSubtype::Vanilla => "vanilla".to_string(),
            InstanceSubtype::Forge => "forge".to_string(),
        }
    }
}

fn log_instance(child: &mut Child) -> Result<(), InstanceError> {
    let mut child = child.stdout.as_mut().ok_or_else(|| {
        std::io::Error::new(ErrorKind::Other, "Could not capture standard output.")
    })?;

    let reader = BufReader::new(&mut child);

    reader
        .lines()
        .filter_map(|line| line.ok())
        .for_each(|line| log_mc_line(&line));

    Ok(())
}

impl InstanceSubtype {
    pub fn get_required_parts(
        &self,
        client: &LauncherClient,
        instance: &Instance,
        version_manifest: &VersionManifest,
        asset_index: &AssetsIndex,
    ) -> Vec<Download> {
        match self {
            InstanceSubtype::Vanilla => {
                get_vanilla_required(client, instance, version_manifest, asset_index)
            }
            InstanceSubtype::Forge => todo!(),
        }
    }

    pub async fn launch(&self, instance: &Instance) -> Result<(), InstanceError> {
        match self {
            InstanceSubtype::Vanilla => {
                let mut child = launch_vanilla(instance).await?;

                log_instance(&mut child)?;

                Ok(())
            }
            InstanceSubtype::Forge => todo!(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Instance {
    pub name: String,
    subtype: InstanceSubtype,
    pub version: String,
    pub instance_path: String,
}

#[derive(Debug, Error)]
pub enum InstanceError {
    #[error("Failed to get data for instance: {0}")]
    GetData(#[from] reqwest::Error),
    #[error("Failed to get local data for instance: {0}")]
    GetLocalData(String),
    #[error("IO error: {0}")]
    IOError(#[from] io::Error),
}

impl Instance {
    pub fn new(
        client: &LauncherClient,
        name: String,
        subtype: InstanceSubtype,
        version: String,
    ) -> Self {
        let instance_path = get_instance_path(client, &name).unwrap();

        Instance {
            name,
            subtype,
            version,
            instance_path,
        }
    }

    pub async fn install<'a>(
        &'a self,
        client: &'static LauncherClient,
        downloader: &'static Downloader,
        window: &'a tauri::Window,
    ) -> Result<(), InstanceError> {
        let list_of_downloads = self
            .get_required_parts(client)
            .await?
            .into_iter()
            .collect::<Vec<Download>>();

        downloader
            .download_all(list_of_downloads, Some(window))
            .await?;

        let delimiter = match client.os {
            OS::Windows => ";",
            OS::Linux => ":",
        };

        // you'll need a list of all libraries for the -??p launch parameter
        let libraries_path = get_libraries_path(client).unwrap();
        let libraries_string = get_libraries_list(&libraries_path, delimiter);
        let libraries_string = get_libraries_str(self, &libraries_string, delimiter).unwrap();
        let libraries_string_path = get_libraries_string_file_path(self).unwrap();

        tokio::fs::write(libraries_string_path, &libraries_string).await?;

        Ok(())
    }

    pub async fn get_required_parts(
        &self,
        client: &LauncherClient,
    ) -> Result<Vec<Download>, InstanceError> {
        let versions_manifest = load_versions_manifest().await?;
        let version_manifest =
            load_version_manifest(&versions_manifest, self.version.to_string()).await?;

        let asset_index = load_asset_index(&version_manifest.asset_index.url).await?;

        let required_parts =
            self.subtype
                .get_required_parts(client, self, &version_manifest, &asset_index);

        Ok(required_parts)
    }

    pub async fn launch<F: Fn()>(&self, on_close: F) -> Result<(), InstanceError> {
        let output = self.subtype.launch(self).await;

        match output {
            Ok(output) => {
                on_close();
                info!("OUTPUT: {:?}", output)
            }
            Err(e) => error!("{}", e),
        }

        Ok(())
    }

    pub fn is_installed(&self) -> bool {
        let is_version_exist = std::path::Path::new(&get_version_path(self).unwrap()).exists();

        is_version_exist
    }
}
