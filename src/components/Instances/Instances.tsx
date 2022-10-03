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
import { useTranslation } from "react-i18next";
import Sidebar from "components/Sidebar";
import InstanceCard from "components/Instance/Instance";
import { Link } from "react-router-dom";
import SelectedInstance from "./SelectedInstance";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import NewInstanceCard from "components/NewInstanceCard";

interface InstancesProps {
  instances: Instance[];
  selectedInstance: Instance | null;
  setSelectedInstance: (instance: Instance) => void;
}

function AddInstanceButton() {
  const { t } = useTranslation();

  return (
    <Link to={"/add-instance"}>
      <Button rightIcon={<AddIcon />} colorScheme="purple" variant="outline">
        {t("instances.actions.addNewInstance")}
      </Button>
    </Link>
  );
}

function InstancesPlaceholder() {
  return (
    <section css={instancesPlaceholderStyles}>
      <AddInstanceButton />
    </section>
  );
}

interface InstancesListProps {
  instances: Instance[];
  setSelectedInstance: (instance: Instance) => void;
  selectedInstance: Instance | null;
}

function InstancesList(props: InstancesListProps) {
  const { instances, selectedInstance, setSelectedInstance } = props;

  function handleListItemClick(instance: Instance) {
    return function () {
      setSelectedInstance(instance);
    };
  }

  return (
    <section>
      <ul css={instancesListStyles}>
        {instances.map((instance) => {
          console.log(instance, selectedInstance);
          const isSelected = selectedInstance?.name === instance.name || false;

          return (
            <li
              key={instance.name}
              css={instancesListItemStyles}
              onClick={handleListItemClick(instance)}
            >
              <InstanceCard instance={instance} isSelected={isSelected} />
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
  const { instances, selectedInstance, setSelectedInstance } = props;

  return (
    <section css={instancesStyles}>
      <div css={instancesListWrapperStyles}>
        {size(instances) ? (
          <InstancesList
            instances={instances}
            selectedInstance={selectedInstance}
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
      </Sidebar>
    </section>
  );
}

export default Instances;
