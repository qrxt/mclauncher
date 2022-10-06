import React from "react";
import Page from "components/Page";
import NewInstanceContainer from "components/NewInstance/NewInstanceContainer";

function InstancesPage() {
  return (
    <Page selectedTab="instances">
      <NewInstanceContainer />
    </Page>
  );
}

export default InstancesPage;
