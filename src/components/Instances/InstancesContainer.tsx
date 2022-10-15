import React, { useCallback, useContext, useEffect, useState } from "react";
import { Instance } from "types/instance";
import Instances from "./Instances";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstances } from "messages";
import { InstancesContext } from "./context";
import LoadingScreen from "components/LoadingScreen";
import { listen, Event } from "@tauri-apps/api/event";
import { fileDownloaded } from "messages/events";

function InstancesContainer() {
  const {
    instances,
    isLoading,
    instancesSuccess,
    selectedInstance,
    setSelectedInstance,
  } = useContext(InstancesContext);
  const [total, setTotal] = useState<number>(0);
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);

  const onDownloadedFile = useCallback((event: Event<string>) => {
    const [fileName, newTotal] = event.payload;
    setTotal(() => Number(newTotal));
    setDownloadedFiles((prev) => [...prev, fileName]);
  }, []);

  useEffect(() => {
    const unlisten = listen<string>(fileDownloaded, onDownloadedFile);

    return () => {
      unlisten.then((f) => {
        f();
      });
    };
  }, [downloadedFiles, onDownloadedFile, total]);

  useEffect(() => {
    console.log("Fetching instances");

    if (isLoading) {
      invoke(getInstances).then((newInstances) => {
        console.log("Found instances: ", newInstances);

        instancesSuccess(newInstances as Instance[]);
      });
    }
  }, [instances, instancesSuccess, isLoading]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Instances
      instances={instances}
      selectedInstance={selectedInstance}
      setSelectedInstance={setSelectedInstance}
      total={total}
      downloadedFilesLength={downloadedFiles.length}
    />
  );
}

export default InstancesContainer;
