use std::str::FromStr;

#[derive(Clone, Debug)]
pub enum OS {
    Windows,
    Linux,
}

impl FromStr for OS {
    type Err = ();

    fn from_str(input: &str) -> Result<OS, Self::Err> {
        match input {
            "windows" => Ok(OS::Windows),
            "linux" => Ok(OS::Linux),
            _ => Err(()),
        }
    }
}

impl ToString for OS {
    fn to_string(&self) -> String {
        match self {
            OS::Windows => "windows".to_string(),
            OS::Linux => "linux".to_string(),
        }
    }
}
