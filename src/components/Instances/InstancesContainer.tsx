import React, { useContext, useEffect } from "react";
import { Instance } from "types/instance";
import Instances from "./Instances";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstances } from "messages";
import { InstancesContext } from "./context";
import LoadingScreen from "components/LoadingScreen";

function InstancesContainer() {
  const {
    instances,
    isLoading,
    instancesSuccess,
    selectedInstance,
    setSelectedInstance,
  } = useContext(InstancesContext);

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
    />
  );
}

export default InstancesContainer;
