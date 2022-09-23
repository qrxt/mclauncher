import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { invoke } from "@tauri-apps/api/tauri";
import { addInstance } from "messages";

interface NewInstanceFormData {
  name: string;
  version: string;
}

function NewInstance() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewInstanceFormData>();

  const onSubmit: SubmitHandler<NewInstanceFormData> = (data) => {
    invoke(addInstance, { ...data, subtype: "Vanilla" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("name", { required: true })} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("version", { required: true })} />

        {/* TODO!: instance subtype select */}

        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        {/* <input type="submit" /> */}
        <button type="submit">Create</button>

        {/* TODO: i18n */}
      </form>
    </div>
  );
}

export default NewInstance;
