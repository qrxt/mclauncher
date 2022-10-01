use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionsManifest {
    pub latest: Latest,
    pub versions: Vec<Version>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Latest {
    release: String,
    snapshot: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Version {
    pub id: String,
    #[serde(rename = "type")]
    version_type: String,
    pub url: String,
    time: String,
    #[serde(rename = "releaseTime")]
    release_time: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Asset {
    pub hash: String,
    pub size: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AssetsIndex {
    pub objects: HashMap<String, Asset>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionManifestAssetsIndex {
    pub id: String,
    pub url: String,
    pub sha1: String,
    pub size: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionManifest {
    pub downloads: VersionDownloads,
    pub libraries: Vec<VersionLibrary>,
    #[serde(rename = "assetIndex")]
    pub asset_index: VersionManifestAssetsIndex,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionDownloads {
    pub client: VersionDownload,
    pub client_mappings: Option<VersionDownload>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionDownload {
    pub sha1: String,
    pub size: usize,
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct RulesOs {
    pub name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct Rule {
    pub action: Option<String>,
    pub os: Option<RulesOs>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionLibrary {
    pub name: String,
    pub downloads: LibraryArtifact,
    pub rules: Option<Vec<Rule>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LibraryArtifact {
    pub artifact: Option<Download>,
    pub classifiers: Option<Classifier>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Download {
    pub path: String,
    pub sha1: String,
    pub size: usize,
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Classifier {
    #[serde(rename = "natives-linux")]
    pub natives_linux: Option<Download>,
    #[serde(rename = "natives-windows")]
    pub natives_windows: Option<Download>,
}
