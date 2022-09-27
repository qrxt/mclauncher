import React, { Dispatch, SetStateAction, useState } from "react";
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
import filter from "lodash/filter";
import { keys, map, omit } from "lodash";
import SelectedInstance from "./SelectedInstance";

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

interface InstancesListProps {
  instances: Instance[];
  setSelectedInstance: Dispatch<SetStateAction<Instance | null>>;
}

function InstancesList(props: InstancesListProps) {
  const { instances, setSelectedInstance } = props;

  function handleListItemClick(instance: Instance) {
    return function () {
      setSelectedInstance(instance);
    };
  }

  return (
    <section>
      <ul css={instancesListStyles}>
        {instances.map((instance) => {
          return (
            <li
              key={instance.name}
              css={instancesListItemStyles}
              onClick={handleListItemClick(instance)}
            >
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
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );

  return (
    <section css={instancesStyles}>
      <div css={instancesListWrapperStyles}>
        {size(instances) ? (
          <InstancesList
            instances={instances}
            setSelectedInstance={setSelectedInstance}
          />
        ) : (
          <InstancesPlaceholder />
        )}
      </div>

      <Sidebar>
        {selectedInstance && (
          <SelectedInstance selectedInstance={selectedInstance} />
        )}

        {/* TODO: Actions */}
      </Sidebar>
    </section>
  );
}

export default Instances;
