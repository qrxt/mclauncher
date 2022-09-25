import { invoke } from "@tauri-apps/api";
import { getVersions } from "messages";
import React, { useEffect, useState } from "react";
import NewInstance from "./NewInstance";

function NewInstanceContainer() {
  const [versions, setVersions] = useState<string[]>([]);
  useEffect(() => {
    console.log("Fetching versions");
    invoke(getVersions).then((instances) => {
      setVersions(instances as string[]);
    });
  }, [setVersions]);

  return <NewInstance versions={versions} />;
}

export default NewInstanceContainer;
