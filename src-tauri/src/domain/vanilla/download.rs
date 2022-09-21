use crate::{
    domain::version::{AssetsIndex, VersionManifest, VersionsManifest},
    instances::instance::InstanceError,
    launcher_config::config::get_versions_manifest,
};

pub async fn load_versions_manifest() -> Result<VersionsManifest, InstanceError> {
    let url = get_versions_manifest().unwrap();

    let resp = reqwest::get(url).await?.json().await?;

    Ok(resp)
}

pub fn get_version_manifest_url(
    versions_manifest: &VersionsManifest,
    version: &str,
) -> Option<String> {
    let version = (versions_manifest.versions)
        .iter()
        .find(|ver| ver.id == version);

    version.map(|version| version.url.to_string())
}

pub async fn load_version_manifest(
    versions_manifest: &VersionsManifest,
    version: String,
) -> Result<VersionManifest, InstanceError> {
    let version_manifest_url = get_version_manifest_url(versions_manifest, &version);

    match version_manifest_url {
        Some(url) => Ok(reqwest::get(&url).await?.json().await?),
        None => Err(InstanceError::GetLocalData(format!(
            "Unable to find version {}",
            &version
        ))),
    }
}

pub async fn load_asset_index(url: &str) -> Result<AssetsIndex, InstanceError> {
    let resp = reqwest::get(url).await?.json().await?;

    Ok(resp)
}
