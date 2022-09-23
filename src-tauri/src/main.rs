#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::client::launcher_client::ClientError;
use crate::client::log::setup_logger;
use crate::domain::os::OS;
use crate::downloader::download_manager::Downloader;
use crate::instances::instance::Instance;
use crate::instances::instance::InstanceSubtype;
use async_once::AsyncOnce;
use client::launcher_client::LauncherClient;
use lazy_static::lazy_static;
use log::{error, info};
use std::{env::consts, str::FromStr};

mod client;
mod domain;
mod downloader;
mod instances;
mod launcher_config;
mod utils;

lazy_static! {
    static ref CLIENT: AsyncOnce<LauncherClient> = AsyncOnce::new(async {
        let os = OS::from_str(consts::OS).unwrap();
        let mut client = LauncherClient::new(os).await;

        match client.init().await {
            Ok(_) => client,
            Err(_) => panic!("Failed to initialize launcher client"),
        }
    });
}

lazy_static! {
    static ref DOWNLOADER: AsyncOnce<Downloader> = AsyncOnce::new(async {
        let mut downloader = Downloader::new(Vec::new());

        downloader
    });
}

#[tauri::command]
async fn get_instances() -> &'static Vec<Instance> {
    let client = CLIENT.get().await;
    info!("Fetching instances");

    &client.instances
}

#[tauri::command]
async fn launch_instance(name: &str) -> Result<(), ()> {
    let client = CLIENT.get().await;
    let downloader = DOWNLOADER.get().await;

    match client.launch_instance(name, downloader).await {
        Ok(_) => info!("Instance successfully launched"),
        Err(e) => error!("Failed to launch instance: {}", e),
    }

    Ok(())
}

#[tauri::command]
async fn add_instance(name: &str, version: &str, subtype: InstanceSubtype) -> Result<(), ()> {
    let mut client = CLIENT.get().await.to_owned();

    let result = client
        .add_instance(name.to_string(), subtype, version.to_string())
        .await;

    match result {
        Ok(_) => info!("Instance successfully created: {}", &name),
        Err(e) => error!("Failed to add instance: {}", e),
    }

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // let name = "1.16.3";
    // let subtype = InstanceSubtype::Vanilla;

    // let os = OS::from_str(consts::OS).unwrap();

    setup_logger(CLIENT.get().await)?;

    // if !client
    //     .instances
    //     .iter()
    //     .any(|instance| instance.name == name)
    // {
    //     client
    //         .add_instance(name.to_string(), subtype, name.to_string())
    //         .await?;
    // }

    // client.launch_instance(name).await?;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_instances,
            launch_instance,
            add_instance
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
