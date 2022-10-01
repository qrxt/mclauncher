import { invoke } from "@tauri-apps/api";
import { getVersions } from "messages";
import React, { useEffect, useState } from "react";
import NewInstance from "./NewInstance";
import { Version } from "types/version";
import size from "lodash/size";

function NewInstanceContainer() {
  const [versions, setVersions] = useState<Version[]>([]);
  useEffect(() => {
    console.log("Fetching versions...");
    invoke(getVersions).then((versions) => {
      console.log("Found versions: ", versions);
      setVersions(versions as Version[]);
    });
  }, [setVersions]);

  return size(versions) ? (
    <NewInstance versions={versions} />
  ) : (
    <p>Loading...</p>
  );
}

export default NewInstanceContainer;
