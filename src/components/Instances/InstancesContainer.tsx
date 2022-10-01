import React, { useContext, useEffect } from "react";
import { Instance } from "types/instance";
import Instances from "./Instances";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstances } from "messages";
import { InstancesContext } from "./context";

function InstancesContainer() {
  const { instances, isLoading, instancesSuccess } =
    useContext(InstancesContext);

  useEffect(() => {
    console.log("Fetching instances");

    if (isLoading) {
      invoke(getInstances).then((newInstances) => {
        console.log("Found instances: ", newInstances);

        instancesSuccess(newInstances as Instance[]);
      });
    }
  }, [instances]);

  return isLoading ? <p>Loading...</p> : <Instances instances={instances} />;
}

export default InstancesContainer;
