use std::path::Path;

use crate::{
    domain::os::OS,
    instances::instance::{Instance, InstanceSubtype},
    launcher_config::config::{
        get_base_path, get_instances_storage_path, get_log_path, get_logs_path,
    },
};
use log::info;
use serde::{Deserialize, Serialize};
use thiserror::Error;
use tokio::{
    fs::{self, create_dir_all},
    io,
    time::Instant,
};

#[derive(Debug, Serialize, Deserialize)]
struct InstancesJson {
    instances: Vec<Instance>,
}

#[derive(Clone)]
pub struct LauncherClient {
    pub instances: Vec<Instance>,
    pub base_path: String,
    pub os: OS,
}

#[derive(Debug, Error)]
pub enum ClientError {
    #[error("Failed to create new instance: {0}")]
    CreateInstance(String),
    #[error("Failed to launch instance: {0}")]
    Launch(String),
    #[error("Failed to install instance: {0}")]
    InstallInstance(String),
    #[error("IO error: {0}")]
    IOError(#[from] io::Error),
}

async fn read_instances_json(client: &LauncherClient) -> InstancesJson {
    let instances_json_path = get_instances_storage_path(client).unwrap();
    let instances_content = fs::read(instances_json_path).await;
    let instances_slice = match instances_content {
        Ok(instances) => instances,
        Err(_) => Vec::new(),
    };

    let instances_json: InstancesJson = serde_json::from_slice(&instances_slice).unwrap();

    instances_json
}

impl LauncherClient {
    pub async fn new(os: OS) -> Self {
        Self {
            base_path: get_base_path().unwrap(),
            instances: Vec::new(),
            os,
        }
    }

    pub async fn init(&mut self) -> Result<&Self, ClientError> {
        // Create instances storage
        let instances_storage_path = get_instances_storage_path(self).unwrap();
        let instances_json_path = Path::new(&instances_storage_path);

        let empty_instances_json = r#"
            {
                "instances": []
            }
        "#;

        if !instances_json_path.exists() {
            fs::write(instances_json_path, empty_instances_json).await?;
        }

        let instances_json = read_instances_json(self).await;

        self.instances = instances_json.instances;

        // Create log file
        let log_path_str = get_log_path(self, "latest").unwrap();
        let log_path = Path::new(&log_path_str);

        if !log_path.exists() {
            let logs_path = get_logs_path(self).unwrap();
            create_dir_all(logs_path).await?;

            fs::write(log_path, "").await?;
        }

        Ok(self)
    }

    pub async fn add_instance(
        &mut self,
        name: String,
        subtype: InstanceSubtype,
        version: String,
    ) -> Result<&Self, ClientError> {
        // check if there are no instances with this name
        let is_instance_exist = &self.instances.iter().any(|instance| instance.name == name);

        if *is_instance_exist {
            return Err(ClientError::CreateInstance(
                "Instance with such name already exist".to_string(),
            ));
        }

        // prepare Instance item
        let instance_local_data = Instance::new(self, name, subtype, version);

        // write to instances.json
        self.instances.push(instance_local_data);
        let new_instances_json = InstancesJson {
            instances: self.instances.clone(),
        };
        let stringified = serde_json::to_string(&new_instances_json).unwrap();

        match fs::write("./launcher/instances.json", stringified.as_bytes()).await {
            Ok(_) => Ok(self),
            Err(e) => Err(ClientError::CreateInstance(e.to_string())),
        }
    }

    // pub async fn delete(&mut self, name: &str) -> Result<(), ClientError> {
    //     self.instances.retain(|instance| instance.name != name);

    //     let new_instances_json = InstancesJson {
    //         instances: self.instances.clone(),
    //     };
    //     let stringified = serde_json::to_string(&new_instances_json).unwrap();

    //     match fs::write("./launcher/instances.json", stringified.as_bytes()).await {
    //         Ok(_) => Ok(()),
    //         Err(e) => Err(ClientError::CreateInstance(e.to_string())),
    //     }
    // }

    // pub async fn edit(&self) -> Result<(), ClientError> {
    // }

    pub async fn launch_instance(&self, name: &str) -> Result<(), ClientError> {
        let fitting_instance_option = self.instances.iter().find(|instance| instance.name == name);
        let instance = match fitting_instance_option {
            Some(instance) => instance,
            None => {
                return Err(ClientError::Launch(
                    "Cant find instance with such name".to_string(),
                ))
            }
        };

        // install if needed
        let timer = Instant::now();

        if !instance.is_installed() {
            let installation = instance.install(self).await;

            if let Err(e) = installation {
                return Err(ClientError::InstallInstance(format!(
                    "Failed to install instance: {}",
                    e
                )));
            }
        }

        let elapsed = timer.elapsed();
        info!(
            "Installation took {}s ({}ms)",
            elapsed.as_secs(),
            elapsed.as_millis()
        );

        // launch

        match instance.launch().await {
            Ok(_) => Ok(()),
            Err(_) => Err(ClientError::Launch("Failed to launch instance".to_string())),
        }
    }
}
