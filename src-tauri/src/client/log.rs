use log::{error, info, warn};
use tokio::fs::OpenOptions;

use crate::launcher_config::config::get_log_path;

use super::launcher_client::LauncherClient;

// [main/INFO] [pool-3-thread-1/INFO] [Render thread/INFO]
// [main/WARN] [Worker-Main-11/WARN]
// [main/ERROR] [Worker-Main-11/ERROR]

fn is_info(line: &str) -> bool {
    line.contains("/INFO")
}

fn is_warn(line: &str) -> bool {
    line.contains("/WARN")
}

fn is_err(line: &str) -> bool {
    line.contains("/ERROR")
}

pub fn log_mc_line(line: &str) {
    match (is_warn(line), is_err(line), is_info(line)) {
        (true, false, false) => warn!("{}", line),
        (false, true, false) => error!("{}", line),
        _ => info!("{}", line),
    }
}

pub async fn setup_logger(client: &LauncherClient) -> Result<(), fern::InitError> {
    let now = chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]");
    let logfile_name = "latest";
    let logfile_path = get_log_path(client, logfile_name).unwrap();

    OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .truncate(true)
        .open(&logfile_path)
        .await?;

    fern::Dispatch::new()
        .format(move |out, message, record| {
            out.finish(format_args!(
                "{}[{}][{}] {}",
                &now,
                record.target(),
                record.level(),
                message
            ))
        })
        .level(log::LevelFilter::Debug)
        .chain(std::io::stdout())
        .chain(fern::log_file(logfile_path)?)
        .apply()?;
    Ok(())
}
