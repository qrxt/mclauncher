import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const { t } = useTranslation();
  const { versions } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewInstanceFormData>();
  const [shouldShowOnlyReleases, setShouldShowOnlyReleases] = useState(true);
  const filteredVersions = useFilteredVersions(
    versions,
    shouldShowOnlyReleases
  );

  const onSubmit: SubmitHandler<NewInstanceFormData> = (data) => {
    invoke(addInstance, { ...data, subtype: "Vanilla" });
  };

  function handleShouldShowSnapshots(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.checked;

    setShouldShowOnlyReleases(currentValue);
  }

  return (
    <div css={newInstanceWrapperStyles}>
      <div css={newInstanceFormWrapperStyles}>
        <h2>{t("newInstance.title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} css={newInstanceFormStyles}>
          <div>
            <input
              placeholder={t("newInstance.form.fields.name.title")}
              {...register("name", { required: true })}
              css={newInstanceFormInputStyles}
            />
            <span>
              {errors.name && t("newInstance.form.fields.name.required")}
            </span>
          </div>
          {/* TODO! fixed height select with virtualization */}
          <label>
            <input
              type="checkbox"
              name="show-snapshots"
              checked={shouldShowOnlyReleases}
              onChange={handleShouldShowSnapshots}
            />
            <span>{t("newInstance.showOnlyReleases")}</span>
          </label>
          <select {...register("version")} css={newInstanceFormInputStyles}>
            {map(filteredVersions, ({ id: version }) => (
              <option value={version} key={version}>
                {version}
              </option>
            ))}
          </select>

          <button type="submit" css={newInstanceFormSubmitButtonStyles}>
            {t("newInstance.actions.create")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewInstance;
