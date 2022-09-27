import React, { ChangeEvent, useState } from "react";
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

  console.log(versions, filteredVersions);

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
        <h1>Create new instance</h1>
        <form onSubmit={handleSubmit(onSubmit)} css={newInstanceFormStyles}>
          <div>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
              css={newInstanceFormInputStyles}
            />
            <span>{errors.name && "Name field is required"}</span>
          </div>

          {/* <input
            placeholder="Version"
            {...register("version", { required: true })}
            css={newInstanceFormInputStyles}
          /> */}

          {/* TODO! fixed height select with virtualization */}
          <label>
            <input
              type="checkbox"
              name="show-snapshots"
              checked={shouldShowOnlyReleases}
              onChange={handleShouldShowSnapshots}
            />
            <span>Show only releases</span>
          </label>
          <select {...register("version")} css={newInstanceFormInputStyles}>
            {map(filteredVersions, ({ id: version }) => (
              <option value={version} key={version}>
                {version}
              </option>
            ))}
          </select>

          {/* {errors.name && <span>This field is required</span>} */}
          <button type="submit" css={newInstanceFormSubmitButtonStyles}>
            Create
          </button>
          {/* TODO: i18n */}
        </form>
      </div>
    </div>
  );
}

export default NewInstance;
