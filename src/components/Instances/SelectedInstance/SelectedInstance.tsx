import { invoke } from "@tauri-apps/api";
import { deleteInstance } from "messages";
import { InstancesContext } from "components/Instances";
import React, { useContext } from "react";
import { Instance } from "types/instance";
import {
  selectedInstanceInfoTitleStyles,
  selectedInstanceInfoWrapperStyles,
  selectedInstanceWrapperStyles,
  selectedInstanceInfoStyles,
  selectedInstanceActionsWrapperStyles,
  selectedInstanceActionsStyles,
  selectedInstanceTitleStyles,
  selectedInstanceActionsItemStyles,
} from "./SelectedInstance.style";

interface SelectedInstanceProps {
  selectedInstance: Instance;
}

function SelectedInstance(props: SelectedInstanceProps) {
  const { selectedInstance } = props;
  const { name, subtype, version } = selectedInstance;
  const { instancesLoading } = useContext(InstancesContext);

  function handleDelete({ name }: Instance) {
    return function () {
      invoke(deleteInstance, { name }).then(() => {
        instancesLoading();
      });
    };
  }

  return (
    <section css={selectedInstanceWrapperStyles}>
      <h3 css={selectedInstanceTitleStyles}>Instance info</h3>
      <dl>
        <div css={selectedInstanceInfoWrapperStyles}>
          <dt css={selectedInstanceInfoTitleStyles}>Name</dt>
          <dd css={selectedInstanceInfoStyles}>{name}</dd>
        </div>

        <div css={selectedInstanceInfoWrapperStyles}>
          <dt css={selectedInstanceInfoTitleStyles}>Instance type</dt>
          <dd css={selectedInstanceInfoStyles}>{subtype}</dd>
        </div>

        <div css={selectedInstanceInfoWrapperStyles}>
          <dt css={selectedInstanceInfoTitleStyles}>Version</dt>
          <dd css={selectedInstanceInfoStyles}>{version}</dd>
        </div>
      </dl>

      <div css={selectedInstanceActionsWrapperStyles}>
        <h3 css={selectedInstanceTitleStyles}>Actions</h3>

        <ul css={selectedInstanceActionsStyles}>
          <li css={selectedInstanceActionsItemStyles}>
            <button onClick={handleDelete(selectedInstance)}>
              Delete
              {/* TODO: i18n */}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SelectedInstance;
