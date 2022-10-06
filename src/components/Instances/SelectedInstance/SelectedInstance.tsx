import { invoke } from "@tauri-apps/api";
import { deleteInstance, launchInstance } from "messages";
import { InstancesContext } from "components/Instances";
import React, { useContext } from "react";
import { Instance } from "types/instance";
import {
  selectedInstanceInfoTitleStyles,
  selectedInstanceInfoWrapperStyles,
  selectedInstanceWrapperStyles,
  selectedInstanceInfoStyles,
  selectedInstanceActionsWrapperStyles,
  selectedInstanceActionStyles,
} from "./SelectedInstance.style";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack, useToast } from "@chakra-ui/react";

interface SelectedInstanceProps {
  selectedInstance: Instance;
}

function SelectedInstance(props: SelectedInstanceProps) {
  const { selectedInstance } = props;
  const { name, subtype, version } = selectedInstance;
  const {
    deleteInstance: deleteInstanceAction,
    setSelectedInstance: selectInstance,
  } = useContext(InstancesContext);
  const { t } = useTranslation();
  const toast = useToast();

  function handleDelete({ name }: Instance) {
    return function () {
      invoke(deleteInstance, { name })
        .then(() => {
          toast({
            status: "success",
            title: t("instances.actions.delete.success"),
            isClosable: true,
          });
        })
        .then(() => {
          deleteInstanceAction(name);
          selectInstance(null);
        });
    };
  }

  function handleLaunch({ name }: Instance) {
    return function () {
      invoke(launchInstance, { name });
    };
  }

  return (
    <section
      css={selectedInstanceWrapperStyles}
      data-testid="selected-instance"
    >
      <Box marginBottom={12}>
        <dl>
          <div css={selectedInstanceInfoWrapperStyles}>
            <dt css={selectedInstanceInfoTitleStyles}>{t("instance.name")}</dt>
            <dd
              css={selectedInstanceInfoStyles}
              data-testid="selected-instance-name"
            >
              {name}
            </dd>
          </div>

          <div css={selectedInstanceInfoWrapperStyles}>
            <dt css={selectedInstanceInfoTitleStyles}>{t("instance.type")}</dt>
            <dd css={selectedInstanceInfoStyles}>{subtype}</dd>
          </div>

          <div css={selectedInstanceInfoWrapperStyles}>
            <dt css={selectedInstanceInfoTitleStyles}>
              {t("instance.version")}
            </dt>
            <dd css={selectedInstanceInfoStyles}>{version}</dd>
          </div>
        </dl>
      </Box>

      <div css={selectedInstanceActionsWrapperStyles}>
        <Stack>
          <Button
            onClick={handleLaunch(selectedInstance)}
            css={selectedInstanceActionStyles}
            colorScheme="purple"
            padding="4"
          >
            {t("instances.actions.launch")}
          </Button>
          <Button
            onClick={handleDelete(selectedInstance)}
            css={selectedInstanceActionStyles}
            colorScheme="purple"
            padding="4"
          >
            {t("instances.actions.delete")}
          </Button>
        </Stack>
      </div>
    </section>
  );
}

export default SelectedInstance;
