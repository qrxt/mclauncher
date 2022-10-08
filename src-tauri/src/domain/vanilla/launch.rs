use log::info;
use std::{
    io::{BufRead, BufReader, Error, ErrorKind},
    process::{Command, Stdio},
};

use crate::{
    client::log::log_mc_line,
    instances::instance::{Instance, InstanceError},
    launcher_config::config::{get_libraries_string_file_path, get_natives_path},
};

pub struct LaunchArguments {
    natives_path: String,
    libs_string: String,
    username: String,
    version: String,
    access_token: String,
    user_properties: String,
    game_dir: String,
    assets_dir: String,
    asset_index: String,
    width: i32,
    height: i32,
}

impl Default for LaunchArguments {
    fn default() -> Self {
        Self {
            natives_path: "".to_string(),
            libs_string: "".to_string(),
            username: "Player".to_string(),
            version: "".to_string(),
            access_token: "0".to_string(),
            user_properties: "{}".to_string(),
            game_dir: "".to_string(),
            assets_dir: "./launcher/assets/".to_string(),
            asset_index: "".to_string(),
            width: 800,
            height: 600,
        }
    }
}

pub async fn launch(instance: &Instance) -> Result<(), InstanceError> {
    let libraries_string_file_path = get_libraries_string_file_path(instance).unwrap();
    let libraries_list_file_content = tokio::fs::read(libraries_string_file_path).await?;
    let libs_string = std::str::from_utf8(&libraries_list_file_content).unwrap();
    let (asset_index, _) = instance.version.rsplit_once('.').unwrap();
    let natives_path = get_natives_path(instance).unwrap();

    let args = LaunchArguments {
        natives_path,
        libs_string: libs_string.to_string(),
        version: instance.version.to_string(),
        game_dir: instance.instance_path.to_string(),
        asset_index: asset_index.to_string(),
        ..LaunchArguments::default()
    };

    let mut command_base = Command::new("java");
    let command = command_base
        .arg(format!("-Djava.library.path={}", args.natives_path))
        .arg("-Xmx2G")
        // .arg("-XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M") // TODO: make configurable
        .arg("-cp")
        .arg(args.libs_string)
        .arg("net.minecraft.client.main.Main")
        .arg("--username")
        .arg(args.username)
        .arg("--version")
        .arg(args.version)
        .arg("--accessToken")
        .arg(args.access_token)
        .arg("--userProperties")
        .arg(args.user_properties)
        .arg("--gameDir")
        .arg(args.game_dir)
        .arg("--assetsDir")
        .arg(args.assets_dir)
        .arg("--assetIndex")
        .arg(args.asset_index)
        .arg("--width")
        .arg(args.width.to_string())
        .arg("--height")
        .arg(args.height.to_string())
        .stdout(Stdio::piped());

    info!("Launch Command: {:?}", command);

    let reader = BufReader::new(
        command
            .spawn()?
            .stdout
            .ok_or_else(|| Error::new(ErrorKind::Other, "Could not capture standard output."))?,
    );

    reader
        .lines()
        .filter_map(|line| line.ok())
        .for_each(|line| log_mc_line(&line));

    // dbg!(command.status());

    Ok(())
}
