use crate::client::launcher_client::read_instances_json;
use crate::domain::vanilla::download::load_versions_manifest;
use crate::domain::version::Version;
use crate::instances::instance::Instance;
use crate::instances::instance::InstanceSubtype;
use crate::CLIENT;
use crate::DOWNLOADER;
use log::{error, info};

// TODO! error handling

#[tauri::command]
pub async fn get_versions() -> Result<Vec<Version>, ()> {
    info!("Fetching versions...");
    let versions_manifest = load_versions_manifest().await;

    match versions_manifest {
        Ok(manifest) => Ok(manifest.versions),
        Err(e) => {
            error!("Failed to fetch versions: {e}");

            Err(())
        }
    }
}

#[tauri::command]
pub async fn get_instances() -> Vec<Instance> {
    info!("Fetching instances...");
    let client = CLIENT.get().await;
    let instances = read_instances_json(client).await.instances;

    info!(
        "Found instances: {:?}",
        &instances
            .iter()
            .map(|instance| instance.name.to_string())
            .collect::<Vec<String>>()
    );

    instances
}

#[tauri::command]
pub async fn launch_instance(name: &str, window: tauri::Window) -> Result<(), ()> {
    match window.emit("game_launched", name) {
        Ok(_) => info!("game_launched event fired. Payload: {}", name),
        Err(_) => error!("Failed to emit game_launched event. Payload: {}", name),
    };

    let name = name.to_string();
    info!("Launching instance {}", name);
    let client = CLIENT.get().await;
    let downloader = DOWNLOADER.get().await;

    tokio::spawn(async move {
        match client
            .launch_instance(&name.to_string(), downloader, || {
                match window.emit("game_closed", name.to_string()) {
                    Ok(_) => info!("game_closed event fired. Payload: {}", &name),
                    Err(_) => error!("Failed to emit game_launched event. Payload: {}", &name),
                };
            })
            .await
        {
            Ok(_) => info!("Instance successfully launched"),
            Err(e) => error!("Failed to launch instance: {}", e),
        }
    });

    Ok(())
}

#[tauri::command]
pub async fn add_instance(name: &str, version: &str, subtype: InstanceSubtype) -> Result<(), ()> {
    info!("Adding instance {}", name);
    let mut client = CLIENT.get().await.to_owned();
    let instances = get_instances().await;
    client.instances = instances;

    let result = client
        .add_instance(name.to_string(), subtype, version.to_string())
        .await;

    match result {
        Ok(_) => info!("Instance successfully created: {}", &name),
        Err(e) => error!("Failed to add instance: {}", e),
    }

    Ok(())
}

#[tauri::command]
pub async fn delete_instance(name: &str) -> Result<(), ()> {
    info!("Trying to delete instance {}", name);
    let mut client = CLIENT.get().await.to_owned();
    let instances = get_instances().await;
    client.instances = instances;

    match client.delete(name).await {
        Ok(_) => info!("Instance successfully deleted: {}", name),
        Err(e) => error!("Failed to delete instance: {}", e),
    }

    Ok(())
}
