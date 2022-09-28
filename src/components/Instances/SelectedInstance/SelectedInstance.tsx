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
  selectedInstanceActionStyles,
} from "./SelectedInstance.style";
import { useTranslation } from "react-i18next";

interface SelectedInstanceProps {
  selectedInstance: Instance;
}

function SelectedInstance(props: SelectedInstanceProps) {
  const { selectedInstance } = props;
  const { name, subtype, version } = selectedInstance;
  const { instancesLoading } = useContext(InstancesContext);
  const { t } = useTranslation();

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
          <dt css={selectedInstanceInfoTitleStyles}>{t("instance.name")}</dt>
          <dd css={selectedInstanceInfoStyles}>{name}</dd>
        </div>

        <div css={selectedInstanceInfoWrapperStyles}>
          <dt css={selectedInstanceInfoTitleStyles}>{t("instance.type")}</dt>
          <dd css={selectedInstanceInfoStyles}>{subtype}</dd>
        </div>

        <div css={selectedInstanceInfoWrapperStyles}>
          <dt css={selectedInstanceInfoTitleStyles}>{t("instance.version")}</dt>
          <dd css={selectedInstanceInfoStyles}>{version}</dd>
        </div>
      </dl>

      <div css={selectedInstanceActionsWrapperStyles}>
        <h3 css={selectedInstanceTitleStyles}>{t("instance.actions")}</h3>

        <ul css={selectedInstanceActionsStyles}>
          <li css={selectedInstanceActionsItemStyles}>
            <button
              onClick={handleDelete(selectedInstance)}
              css={selectedInstanceActionStyles}
            >
              {t("instances.actions.delete")}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SelectedInstance;
