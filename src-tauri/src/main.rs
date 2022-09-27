#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::client::log::setup_logger;
use crate::domain::os::OS;
use crate::downloader::download_manager::Downloader;
use async_once::AsyncOnce;
use client::launcher_client::LauncherClient;
use lazy_static::lazy_static;
use std::{env::consts, str::FromStr};

mod client;
mod commands;
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
    static ref DOWNLOADER: AsyncOnce<Downloader> =
        AsyncOnce::new(async { Downloader::new(Vec::new()) });
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    setup_logger(CLIENT.get().await)?;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::get_instances,
            commands::launch_instance,
            commands::add_instance,
            commands::get_versions,
            commands::delete_instance,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
