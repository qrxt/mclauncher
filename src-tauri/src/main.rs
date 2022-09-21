#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::client::launcher_client::ClientError;
use crate::client::log::setup_logger;
use crate::domain::os::OS;
use crate::instances::instance::Instance;
use async_once::AsyncOnce;
use client::launcher_client::LauncherClient;
use lazy_static::lazy_static;
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

#[tauri::command]
async fn get_instances() -> &'static Vec<Instance> {
    let client = CLIENT.get().await;

    &client.instances
}

// #[tauri::command]
// async fn launch_instance(name: &str) -> Result<(), ()> {
//     let client = CLIENT.get().await;

//     client.launch_instance(name).await;

//     Ok(())
// }

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
        .invoke_handler(tauri::generate_handler![get_instances])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
