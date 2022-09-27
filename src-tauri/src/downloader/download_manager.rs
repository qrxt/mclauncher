use std::path::Path;

use futures::StreamExt;
use log::{info, warn};
use reqwest::Client;
use tokio::fs::{create_dir_all, File};
use tokio::io::{self};

use crate::domain::version::Download;
use crate::instances::instance::InstanceError;

pub struct Downloader {
    pub downloads: Vec<Download>,
}

impl Downloader {
    pub fn new(downloads: Vec<Download>) -> Self {
        Downloader { downloads }
    }

    async fn download_to(&self, url: &str, to: &str, client: &Client) -> Result<(), InstanceError> {
        let resp = client.get(url).send().await?.bytes().await?;
        let mut resp = resp.as_ref();

        let (path, _) = to.rsplit_once('/').unwrap();

        create_dir_all(path).await?;

        info!("creating {}", &to);
        let mut out = File::create(&to).await?;

        io::copy(&mut resp, &mut out).await?;

        Ok(())
    }

    fn check_if_exists(&self, download: &Download) -> bool {
        let path_exists = Path::new(&download.path).exists();

        if path_exists {
            warn!("The file already exists: {}", &download.path);
        }

        !path_exists
    }

    pub async fn download_all(
        &'static self,
        downloads: Vec<Download>,
    ) -> Result<(), InstanceError> {
        let fetches = futures::stream::iter(
            downloads
                .into_iter()
                .filter(|download| self.check_if_exists(download))
                .map(|download| async move {
                    let client = Client::new();
                    self.download_to(&download.url, &download.path, &client)
                        .await?;

                    Ok(())
                }),
        )
        .buffer_unordered(16)
        .collect::<Vec<Result<(), InstanceError>>>();

        fetches.await;
        Ok(())
    }
}

// tokio::spawn(async move {
//     let download_result = self.download_to(&download.url, &download.path).await;

//     match download_result {
//         Ok(_) => info!("Resource {} successfully downloaded", &download.path),
//         Err(_) => error!("Failed to download {}", &download.path),
//     }
// });
