import React from "react";
import { Instance } from "types/instance";
import { instancesStyles, instancesPlaceholderStyles } from "./Instances.style";
import size from "lodash/size";
import { AddButton } from "components/buttons/AddButton";
import { AddButtonVariant } from "components/buttons/AddButton/AddButton";
import { useTranslation } from "react-i18next";
import Sidebar from "components/Sidebar";

interface InstancesProps {
  instances: Instance[];
}

function InstancesPlaceholder() {
  const { t } = useTranslation();

  return (
    <section css={instancesPlaceholderStyles}>
      <AddButton
        variant={AddButtonVariant.Text}
        text={t("instances.actions.addNewInstance")}
      />
    </section>
  );
}

function InstancesList() {
  return <section></section>;
}

function Instances(props: InstancesProps) {
  const { instances } = props;

  return (
    <section css={instancesStyles}>
      <div>
        {size(instances) ? <InstancesList /> : <InstancesPlaceholder />}
      </div>

      <Sidebar>sidebar</Sidebar>
    </section>
  );
}

export default Instances;
