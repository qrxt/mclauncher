import React from "react";
import { Instance } from "types/instance";
import { instancesStyles, instancesPlaceholderStyles } from "./Instances.style";
import size from "lodash/size";
import { AddButton } from "components/buttons/AddButton";
import { AddButtonVariant } from "components/buttons/AddButton/AddButton";
import { useTranslation } from "react-i18next";
import Sidebar from "components/Sidebar";
import InstanceCard from "components/Instance/Instance";

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

function InstancesList({ instances }: { instances: Instance[] }) {
  return (
    <section>
      {instances.map((instance) => {
        return <InstanceCard instance={instance} key={instance.name} />;
      })}
    </section>
  );
}

function Instances(props: InstancesProps) {
  const { instances } = props;
  console.log("instances: ", instances);

  return (
    <section css={instancesStyles}>
      <div>
        {size(instances) ? (
          <InstancesList instances={instances} />
        ) : (
          <InstancesPlaceholder />
        )}
      </div>

      <Sidebar>sidebar</Sidebar>
    </section>
  );
}

export default Instances;
