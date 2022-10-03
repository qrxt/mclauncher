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
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  useToast,
} from "@chakra-ui/react";

interface SettingsFormData {
  language: string;
}

function SettingsForm() {
  const { register, handleSubmit } = useForm<SettingsFormData>();
  const { t, i18n } = useTranslation();
  const languages = keys(resources);
  const toast = useToast();

  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    i18n.changeLanguage(data.language);

    toast({
      status: "success",
      title: t("settings.actions.submit.success"),
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={settingsFormStyles}>
      <Heading as="h2" size="md" noOfLines={1} marginBottom="6">
        {t("settings.title")}
      </Heading>
      <div css={settingsFormFieldsWrapperStyles}>
        <FormControl marginBottom={6}>
          <FormLabel>{t("settings.language")}</FormLabel>
          <Select
            {...register("language")}
            css={settingsFormLanguageSelectStyles}
          >
            {map(languages, (lang) => (
              <option defaultValue={i18n.language} value={lang} key={lang}>
                {t(`languages.${lang}`)}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="purple" padding="4">
          {t("settings.actions.submit")}
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
