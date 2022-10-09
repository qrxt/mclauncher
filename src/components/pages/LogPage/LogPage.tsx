import React, { useEffect, useState } from "react";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { resourceDir, appDir } from "@tauri-apps/api/path";

export const readFile = async () => {
  const filePath = "launcher/logs/latest.log";
  const appPath = BaseDirectory.App;
  const promise = readTextFile(filePath, {
    dir: appPath,
  });

  return promise;
};

function LogPage() {
  const [log, setLog] = useState<any>(null);
  useEffect(() => {
    readFile().then((fileData) => {
      console.log("xx", fileData);

      setLog(fileData);
    });
  }, []);
  console.log(log);

  return <div>{log}</div>;
}

export default LogPage;
