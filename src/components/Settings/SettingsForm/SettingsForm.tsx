import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import map from "lodash/map";
import keys from "lodash/keys";
import { useTranslation } from "react-i18next";
import { resources } from "../../../i18n";
import {
  settingsFormStyles,
  settingsFormLanguageSelectStyles,
  settingsFormFieldsWrapperStyles,
  settingsFormFieldWrapperStyles,
} from "./SettingsForm.style";

interface SettingsFormData {
  language: string;
}

function SettingsForm() {
  const { register, handleSubmit } = useForm<SettingsFormData>();
  const { t, i18n } = useTranslation();
  const languages = keys(resources);

  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    i18n.changeLanguage(data.language);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={settingsFormStyles}>
      <h2>{t("settings.title")}</h2>
      <div css={settingsFormFieldsWrapperStyles}>
        <div css={settingsFormFieldWrapperStyles}>
          <h3>{t("settings.language")}</h3>
          <select
            {...register("language")}
            css={settingsFormLanguageSelectStyles}
          >
            {map(languages, (lang) => (
              <option defaultValue={i18n.language} value={lang} key={lang}>
                {t(`languages.${lang}`)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{t("settings.actions.submit")}</button>
      </div>
    </form>
  );
}

export default SettingsForm;
