use std::fs::{self, ReadDir};

pub fn get_libraries_list(root_path: &str, delimiter: &str) -> String {
    fn inner(paths: ReadDir, delimiter: &str) -> Vec<String> {
        paths
            .map(|n| -> String {
                let something = n.unwrap().path();
                let meta = fs::metadata(&something).unwrap();
                let str_path = something.to_str().unwrap();

                if meta.is_dir() {
                    return get_libraries_list(str_path, delimiter);
                }

                str_path.to_string()
            })
            .collect::<Vec<String>>()
    }

    let paths = fs::read_dir(root_path).unwrap();
    inner(paths, delimiter).join(delimiter)
}
