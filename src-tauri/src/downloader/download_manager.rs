use futures::StreamExt;
use log::{info, warn};
use reqwest::{Client, StatusCode};
use std::path::Path;
use tokio::fs::{create_dir_all, File};
use tokio::io::{self};

use crate::domain::version::Download;
use crate::instances::instance::InstanceError;

pub struct Downloader {
    client: Client,
}

impl Downloader {
    pub fn new(client: Client) -> Self {
        Downloader { client }
    }

    pub async fn download_to(&self, url: &str, to: &str) -> Result<StatusCode, InstanceError> {
        let response = self.client.get(url).send().await?;
        let status = &response.status();
        let body = &response.bytes().await?;
        let mut body = body.as_ref();

        let (path, _) = to.rsplit_once('/').unwrap();

        if cfg!(test) {
            return Ok(*status);
        }

        create_dir_all(path).await?;

        info!("Creating {}", &to);
        let mut out = File::create(&to).await?;

        io::copy(&mut body, &mut out).await?;

        Ok(*status)
    }

    fn check_if_exists(&self, download: &Download) -> bool {
        let path_exists = Path::new(&download.path).exists();

        if path_exists {
            warn!("The file already exists: {}", &download.path);
        }

        !path_exists
    }

    pub async fn download_all(
        &self,
        downloads: Vec<Download>,
    ) -> Result<Vec<StatusCode>, InstanceError> {
        let fetches = futures::stream::iter(
            downloads
                .into_iter()
                .filter(|download| self.check_if_exists(download))
                .map(
                    |download| async move { self.download_to(&download.url, &download.path).await },
                ),
        )
        .buffer_unordered(16)
        .collect::<Vec<Result<StatusCode, InstanceError>>>();

        fetches.await.into_iter().collect()
    }
}

#[cfg(test)]
mod test_download_manager {
    use super::*;
    use httpmock::prelude::*;

    #[tokio::test]
    async fn test_multiple_downloads() {
        let server = MockServer::start();

        let mock = server.mock(|when, then| {
            when.method(GET).any_request();
            then.status(200)
                .header("content-type", "application/octet-stream;")
                .body("binary stuff");
        });

        let client = reqwest::Client::new();
        let downloader = Downloader::new(client);

        let downloads = vec![
            Download {
                path: "./assets".to_string(),
                sha1: "sha1".to_string(),
                size: 1000,
                url: server.url("/xa/asdjhjk"),
            },
            Download {
                path: "./assets".to_string(),
                sha1: "sha1".to_string(),
                size: 1000,
                url: server.url("/xa/bsdjkzx"),
            },
        ];

        let statuses = downloader.download_all(downloads).await.unwrap();

        statuses
            .into_iter()
            .for_each(|status| assert!(status.is_success()));

        mock.assert_hits(2);
    }
}
