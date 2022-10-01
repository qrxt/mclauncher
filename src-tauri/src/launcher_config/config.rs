use config::Config;
use lazy_static::lazy_static;
use std::collections::HashMap;
use std::sync::RwLock;

use crate::client::launcher_client::LauncherClient;
use crate::instances::instance::Instance;

lazy_static! {
    static ref SETTINGS: RwLock<Config> = {
        RwLock::new(
            Config::builder()
                .add_source(config::File::with_name("./config.json"))
                .build()
                .unwrap(),
        )
    };
}

type ConfigPaths = HashMap<String, String>;
fn get_paths() -> Result<ConfigPaths, Box<dyn std::error::Error>> {
    let paths = SETTINGS.read()?.get::<ConfigPaths>("paths")?;

    Ok(paths)
}

pub fn get_base_path() -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let base_path = paths.get("base_path").unwrap();

    Ok(base_path.to_string())
}

pub fn get_logs_path(client: &LauncherClient) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let logs_path = paths.get("logs").unwrap();

    Ok(logs_path.replace("{base_path}", &client.base_path))
}

pub fn get_instances_storage_path(
    client: &LauncherClient,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let instances_storage_path = paths.get("instances_storage").unwrap();

    Ok(instances_storage_path.replace("{base_path}", &client.base_path))
}

pub fn get_log_path(
    client: &LauncherClient,
    log_name: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let logs_path = paths.get("log").unwrap();

    Ok(logs_path
        .replace("{base_path}", &client.base_path)
        .replace("{log_name}", log_name))
}

pub fn get_version_path(instance: &Instance) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let version = paths.get("version").unwrap();

    Ok(version.replace("{instance_path}", &instance.instance_path))
}

pub fn get_client_mappings_path(instance: &Instance) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let client_mappings = paths.get("client_mappings").unwrap();

    Ok(client_mappings.replace("{instance_path}", &instance.instance_path))
}

pub fn get_libraries_str(
    instance: &Instance,
    libraries_string: &str,
    delimiter: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let version = get_version_path(instance)?;

    let libraries_string = format!("{}{}{}", libraries_string, delimiter, version);

    Ok(libraries_string)
}

pub fn get_asset_index_path(
    client: &LauncherClient,
    file_name: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let asset_indexes_path = paths.get("asset_index").unwrap();
    let path = asset_indexes_path
        .replace("{base_path}", &client.base_path)
        .replace("{asset_index}", file_name);

    Ok(path)
}

pub fn get_asset_path(
    client: &LauncherClient,
    asset_hash: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let hash_part = &asset_hash[..2];

    let paths = get_paths()?;
    let asset_path = paths.get("asset").unwrap();
    let path = asset_path
        .replace("{base_path}", &client.base_path)
        .replace("{hash_part}", hash_part)
        .replace("{hash}", asset_hash);

    Ok(path)
}

pub fn get_libraries_path(client: &LauncherClient) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let libraries_path = paths.get("libraries").unwrap();

    Ok(libraries_path.replace("{base_path}", &client.base_path))
}

pub fn get_libraries_string_file_path(
    instance: &Instance,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let libraries_string_file_path = paths.get("libraries_string_file").unwrap();

    Ok(libraries_string_file_path.replace("{instance_path}", &instance.instance_path))
}

pub fn get_instance_path(
    client: &LauncherClient,
    name: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let instance_path = paths.get("instance").unwrap();

    Ok(instance_path
        .replace("{base_path}", &client.base_path)
        .replace("{name}", name))
}

pub fn get_natives_path(instance: &Instance) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let libraries_string_file_path = paths.get("natives").unwrap();

    Ok(libraries_string_file_path.replace("{instance_path}", &instance.instance_path))
}

pub fn get_library_path(
    client: &LauncherClient,
    lib_path: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_paths()?;
    let libraries_path = paths.get("library").unwrap();
    let path = libraries_path
        .replace("{base_path}", &client.base_path)
        .replace("{lib_path}", lib_path);

    Ok(path)
}

type ConfigUrls = HashMap<String, String>;
fn get_urls() -> Result<ConfigUrls, Box<dyn std::error::Error>> {
    let urls = SETTINGS.read()?.get::<ConfigUrls>("urls")?;

    Ok(urls)
}

pub fn get_asset_url(asset_hash: &str) -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_urls()?;
    let asset_url = paths.get("asset").unwrap();

    let hash_part = &asset_hash[..2];

    Ok(asset_url
        .replace("{hash_part}", hash_part)
        .replace("{hash}", asset_hash))
}

pub fn get_versions_manifest() -> Result<String, Box<dyn std::error::Error>> {
    let paths = get_urls()?;
    let versions_manifest_url = paths.get("versions_manifest").unwrap();

    Ok(versions_manifest_url.to_string())
}
