import React from "react";
import { Instance } from "types/instance";
import Instances from "./Instances";

function InstancesContainer() {
  // TODO: get instances logic
  const instances: Instance[] = []; // TODO! temp, remove

  return <Instances instances={instances} />;
}

export default InstancesContainer;
