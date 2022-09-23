import React, { useEffect, useState } from "react";
import { Instance } from "types/instance";
import Instances from "./Instances";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstances } from "messages";

function InstancesContainer() {
  const [instances, setInstances] = useState<Instance[]>([]);
  useEffect(() => {
    console.log("Fetching instances");
    invoke(getInstances).then((instances) => {
      setInstances(instances as Instance[]);
    });
  }, []);

  return <Instances instances={instances} />;
}

export default InstancesContainer;
