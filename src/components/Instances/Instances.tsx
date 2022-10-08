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
import InstanceContainer from "components/Instance/InstanceContainer";

interface InstancesProps {
  instances: Instance[];
  selectedInstance: Instance | null;
  setSelectedInstance: (instance: Instance) => void;
}

function AddInstanceButton() {
  const { t } = useTranslation();

  return (
    <Link to={"/add-instance"}>
      <Button
        rightIcon={<AddIcon />}
        colorScheme="purple"
        variant="outline"
        data-testid="instances-no-data-add-button"
      >
        {t("instances.actions.addNewInstance")}
      </Button>
    </Link>
  );
}

function InstancesPlaceholder() {
  return (
    <div css={instancesPlaceholderStyles} data-testid="instances-no-data">
      <AddInstanceButton />
    </div>
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
      <ul css={instancesListStyles} data-testid="instances-list">
        {instances.map((instance) => {
          const isSelected = selectedInstance?.name === instance.name || false;

          return (
            <li
              key={instance.name}
              css={instancesListItemStyles}
              onClick={handleListItemClick(instance)}
              data-testid="instances-list-item"
            >
              <InstanceContainer instance={instance} isSelected={isSelected} />
            </li>
          );
        })}
        <li
          key="new-instance"
          css={instancesListItemStyles}
          data-testid="instances-list-item"
        >
          <NewInstanceCard />
        </li>
      </ul>
    </section>
  );
}

function Instances(props: InstancesProps) {
  const { instances, selectedInstance, setSelectedInstance } = props;

  return (
    <section css={instancesStyles} data-testid="instances">
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

      <Sidebar data-testid="instances-sidebar">
        {selectedInstance && (
          <SelectedInstance selectedInstance={selectedInstance} />
        )}
      </Sidebar>
    </section>
  );
}

export default Instances;
