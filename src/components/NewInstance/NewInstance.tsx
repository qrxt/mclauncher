import React, { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { invoke } from "@tauri-apps/api/tauri";
import { addInstance } from "messages";
import map from "lodash/map";
import filter from "lodash/filter";
import {
  newInstanceFormInputStyles,
  newInstanceFormStyles,
  newInstanceFormSubmitButtonStyles,
  newInstanceFormWrapperStyles,
  newInstanceWrapperStyles,
} from "./NewInstance.style";
import { Version } from "types/version";
import { useTranslation } from "react-i18next";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { some } from "lodash";

interface NewInstanceFormData {
  name: string;
  version: string;
}

export interface NewInstanceProps {
  versions: Version[];
}

function useFilteredVersions(versions: Version[], onlyReleases: boolean) {
  const filteredVersions = onlyReleases
    ? filter(versions, (version) => version.type == "release")
    : versions;

  return filteredVersions;
}

function NewInstance(props: NewInstanceProps) {
  const { versions } = props;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewInstanceFormData>();
  const navigate = useNavigate();
  const [shouldShowOnlyReleases, setShouldShowOnlyReleases] = useState(true);
  const filteredVersions = useFilteredVersions(
    versions,
    shouldShowOnlyReleases
  );
  const toast = useToast();

  const onSubmit: SubmitHandler<NewInstanceFormData> = (data) => {
    invoke(addInstance, { ...data, subtype: "Vanilla" })
      .then(() => {
        toast({
          status: "success",
          title: t("newInstance.actions.create.success"),
          isClosable: true,
        });
      })
      .then(() => {
        navigate("/");
      });
  };

  const onSubmitFailure: SubmitErrorHandler<NewInstanceFormData> = (errors) => {
    const hasErrors = some(errors, Boolean);

    hasErrors &&
      toast({
        status: "error",
        title: t("common.form.errors.fieldsRequired"),
        isClosable: true,
      });
  };

  function handleShouldShowSnapshots(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.checked;

    setShouldShowOnlyReleases(currentValue);
  }

  console.log("errors", errors);

  return (
    <div css={newInstanceWrapperStyles}>
      <div css={newInstanceFormWrapperStyles}>
        <form
          onSubmit={handleSubmit(onSubmit, onSubmitFailure)}
          css={newInstanceFormStyles}
        >
          <Heading as="h2" size="md" noOfLines={1} marginBottom="6">
            {t("newInstance.title")}
          </Heading>
          <FormControl marginBottom={6}>
            <FormLabel as="legend">
              {t("newInstance.form.fields.name.title")}
            </FormLabel>
            <Input
              isInvalid={Boolean(errors.name)}
              errorBorderColor="red.300"
              placeholder={t("newInstance.form.fields.name.title")}
              {...register("name", { required: true })}
              css={newInstanceFormInputStyles}
            />
          </FormControl>
          {/* TODO! fixed height select with virtualization */}
          <FormControl>
            <FormLabel as="legend">
              <Stack spacing={5} direction="row">
                <Checkbox
                  name="show-snapshots"
                  defaultChecked
                  onChange={handleShouldShowSnapshots}
                  colorScheme="purple"
                >
                  <span>{t("newInstance.showOnlyReleases")}</span>
                </Checkbox>
              </Stack>
            </FormLabel>
          </FormControl>
          <FormControl marginBottom="6">
            <FormLabel as="legend">
              {t("newInstance.form.fields.version.name")}
            </FormLabel>
            <Select
              {...register("version", { required: true })}
              isInvalid={Boolean(errors.version)}
              placeholder={t("newInstance.form.fields.version.selectVersion")}
            >
              {map(filteredVersions, ({ id: version }) => (
                <option value={version} key={version}>
                  {version}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            css={newInstanceFormSubmitButtonStyles}
            colorScheme="purple"
            padding="4"
          >
            {t("newInstance.actions.create")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewInstance;
