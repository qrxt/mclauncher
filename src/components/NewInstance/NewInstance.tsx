import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { invoke } from "@tauri-apps/api/tauri";
import { addInstance } from "messages";
import {
  newInstanceFormInputStyles,
  newInstanceFormStyles,
  newInstanceFormSubmitButtonStyles,
  newInstanceFormWrapperStyles,
  newInstanceWrapperStyles,
} from "./NewInstance.style";

interface NewInstanceFormData {
  name: string;
  version: string;
}

interface NewInstanceProps {
  versions: string[];
}

function NewInstance(props: NewInstanceProps) {
  const { versions } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewInstanceFormData>();

  const onSubmit: SubmitHandler<NewInstanceFormData> = (data) => {
    invoke(addInstance, { ...data, subtype: "Vanilla" });
  };

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
          <select {...register("version")}>
            {versions.map((version) => (
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
