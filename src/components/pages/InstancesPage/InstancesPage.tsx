import React from "react";
import Page from "components/Page";
import InstancesContainer from "components/Instances/InstancesContainer";
import InstancesProvider from "components/Instances/context";

function InstancesPage() {
  return (
    <Page>
      <InstancesProvider>
        <InstancesContainer />
      </InstancesProvider>
    </Page>
  );
}

export default InstancesPage;
