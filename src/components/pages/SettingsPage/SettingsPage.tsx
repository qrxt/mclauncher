import React from "react";
import Page from "components/Page";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstances } from "messages";
import { Instance } from "types/instance";

function InstancesPage() {
  async function greet() {
    const instances: Instance[] = await invoke(getInstances);

    instances.forEach((instance) =>
      alert([instance.name, instance.instance_path, instance.version])
    );
  }

  return (
    <Page>
      <button onClick={() => greet()}>Do something</button>
      <p>Settings Page</p>
    </Page>
  );
}

export default InstancesPage;
