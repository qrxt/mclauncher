import React from "react";
import { Instance } from "types/instance";
import {
  instancesStyles,
  instancesListStyles,
  instancesListWrapperStyles,
  instancesPlaceholderStyles,
  instancesListItemStyles,
} from "./Instances.style";
import size from "lodash/size";
import { AddButton } from "components/buttons/AddButton";
import { AddButtonVariant } from "components/buttons/AddButton/AddButton";
import { useTranslation } from "react-i18next";
import Sidebar from "components/Sidebar";
import InstanceCard from "components/Instance/Instance";
import { Link } from "react-router-dom";
import instanceCardStyles, {
  instanceIconStyles,
  instanceIconWrapperStyles,
  instanceNameStyles,
} from "components/Instance/Instance.style";
import mcIcon from "../../assets/icons/mc.png";

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

function NewInstanceCard() {
  return (
    <Link to="/add-instance">
      <div tabIndex={0} css={instanceCardStyles}>
        {/* TODO: Add i18n */}
        <header css={instanceNameStyles}>Add new instance</header>
        <div css={instanceIconWrapperStyles}>
          <img css={instanceIconStyles} src={mcIcon} width="64" height="64" />
        </div>
      </div>
    </Link>
  );
}

function InstancesList({ instances }: { instances: Instance[] }) {
  return (
    <section>
      <ul css={instancesListStyles}>
        {instances.map((instance) => {
          return (
            <li key={instance.name} css={instancesListItemStyles}>
              <InstanceCard instance={instance} />
            </li>
          );
        })}
        <li key="new-instance" css={instancesListItemStyles}>
          <NewInstanceCard />
        </li>
      </ul>
    </section>
  );
}

function Instances(props: InstancesProps) {
  const { instances } = props;
  console.log("instances: ", instances);

  return (
    <section css={instancesStyles}>
      <div css={instancesListWrapperStyles}>
        {size(instances) ? (
          <InstancesList instances={instances} />
        ) : (
          <InstancesPlaceholder />
        )}
      </div>

      <Sidebar>{null}</Sidebar>
    </section>
  );
}

export default Instances;
