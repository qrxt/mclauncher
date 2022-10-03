import React from "react";
import Page from "components/Page";
import Settings from "components/Settings";

function InstancesPage() {
  return (
    <Page selectedTab="settings">
      <Settings />
    </Page>
  );
}

export default InstancesPage;
