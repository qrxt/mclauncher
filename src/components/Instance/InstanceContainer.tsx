import React, { useContext } from "react";
import Instance, { InstanceProps } from "./Instance";
import { LaunchContext } from "components/App/context";

function InstanceContainer(props: Omit<InstanceProps, "isLaunched">) {
  const { instance } = props;
  const { isInstanceLaunched } = useContext(LaunchContext);

  return <Instance {...props} isLaunched={isInstanceLaunched(instance.name)} />;
}

export default InstanceContainer;
