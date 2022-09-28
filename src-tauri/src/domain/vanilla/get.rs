// We need the following parts to run the game:
// * Version JAR-file
// * Client mappings

// * Assets (Version Manifest -> assetIndex -> url)
// assetIndex stores the assets to be positioned in
// <instance>/assets/objects/<first 2 hex letters of hash>/<whole hash>
// Each asset can be downloaded from http://resources.download.minecraft.net/<first 2 hex letters of hash>/<whole hash>
// We should save asset index as <instance>/assets/indexes/<short version>.json

// * Libraries (Version Manifest -> libraries)
// Libraries should be downloaded to <instance>/libraries
// Paths to all libraries must be concatenated into a single string
// Native libraries for other operating systems should be filtered out
// We need to download the narrator separately

use crate::client::launcher_client::LauncherClient;
use crate::domain::os::OS;
use crate::domain::version::AssetsIndex;
use crate::domain::version::{Download, VersionManifest};
use crate::instances::instance::Instance;
use crate::launcher_config::config::{
    get_asset_index_path, get_asset_path, get_asset_url, get_client_mappings_path,
    get_library_path, get_version_path,
};
use itertools::concat;

use crate::domain::version::{VersionLibrary, VersionManifestAssetsIndex};

fn get_version_jar(instance: &Instance, version_manifest: &VersionManifest) -> Vec<Download> {
    let version_download = &version_manifest.downloads.client;
    let path = get_version_path(instance).unwrap();

    vec![Download {
        path,
        sha1: version_download.sha1.to_string(),
        size: version_download.size,
        url: version_download.url.to_string(),
    }]
}

fn get_client_mappings(instance: &Instance, version_manifest: &VersionManifest) -> Vec<Download> {
    let version_download = &version_manifest.downloads.client_mappings;
    let path = get_client_mappings_path(instance).unwrap();

    match version_download {
        Some(download) => vec![Download {
            path,
            sha1: download.sha1.to_string(),
            size: download.size,
            url: download.url.to_string(),
        }],
        None => vec![],
    }
}

fn get_asset_index(
    client: &LauncherClient,
    assets_index_info: &VersionManifestAssetsIndex,
) -> Vec<Download> {
    let path = get_asset_index_path(client, &assets_index_info.id).unwrap();

    vec![Download {
        path,
        sha1: assets_index_info.sha1.to_string(),
        size: assets_index_info.size,
        url: assets_index_info.url.to_string(),
    }]
}

fn get_assets(client: &LauncherClient, assets_index: &AssetsIndex) -> Vec<Download> {
    assets_index
        .objects
        .values()
        .into_iter()
        .map(|asset| {
            let path = get_asset_path(client, &asset.hash).unwrap();
            let url = get_asset_url(&asset.hash).unwrap();

            Download {
                path,
                sha1: asset.hash.to_string(),
                size: asset.size,
                url,
            }
        })
        .collect()
}

fn is_for_unsupported_os(version_library: &VersionLibrary, os: &OS) -> bool {
    if version_library.rules.is_none() {
        return false;
    }

    let rules = version_library.rules.as_ref().unwrap();

    rules
        .iter()
        .filter(|rule| rule.os.as_ref().is_some())
        .any(|rule| {
            let rule_os = rule.os.as_ref().unwrap();
            let rule_action = rule.action.as_ref().unwrap();

            rule_action == "allow" && rule_os.name.as_ref().unwrap() != &os.to_string()
        })
}

fn get_common_libraries(version_manifest: &VersionManifest, os: OS) -> Vec<&Download> {
    version_manifest
        .libraries
        .iter()
        .filter(|lib| !is_for_unsupported_os(lib, &os))
        .filter(|lib| lib.downloads.classifiers.is_none())
        .filter_map(|lib| lib.downloads.artifact.as_ref())
        .collect()
}

fn get_native_libraries(version_manifest: &VersionManifest, os: OS) -> Vec<&Download> {
    version_manifest
        .libraries
        .iter()
        .filter(|lib| !is_for_unsupported_os(lib, &os))
        .filter_map(|lib| lib.downloads.classifiers.as_ref())
        .filter_map(|classifier| match os {
            OS::Windows => classifier.natives_windows.as_ref(),
            OS::Linux => classifier.natives_linux.as_ref(),
        })
        .collect()
}

fn get_all_libraries(client: &LauncherClient, version_manifest: &VersionManifest) -> Vec<Download> {
    let common_libs = get_common_libraries(version_manifest, client.os.clone());
    let native_libs = get_native_libraries(version_manifest, client.os.clone());

    let all_libraries = concat(vec![common_libs, native_libs]);

    all_libraries
        .into_iter()
        .cloned()
        .map(|lib| {
            let path = get_library_path(client, &lib.path).unwrap();

            Download { path, ..lib }
        })
        .collect()
}

pub fn get_required(
    client: &LauncherClient,
    instance: &Instance,
    version_manifest: &VersionManifest,
    assets_index: &AssetsIndex,
) -> Vec<Download> {
    let version_jar = get_version_jar(instance, version_manifest);
    let mappings = get_client_mappings(instance, version_manifest);
    let asset_index = get_asset_index(client, &version_manifest.asset_index);
    let assets = get_assets(client, assets_index);

    let libraries = get_all_libraries(client, version_manifest);

    #[rustfmt::skip]
    let res = concat(vec![
        version_jar,
        mappings,
        asset_index,
        assets,
        libraries
    ]);

    res
}
