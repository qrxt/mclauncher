import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { map, keys } from "lodash";
import { useTranslation } from "react-i18next";
import { resources } from "../../../i18n";
import {
  settingsFormStyles,
  settingsFormLanguageSelectStyles,
  settingsFormFieldsWrapperStyles,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={settingsFormStyles}
      data-testid="settings-form"
    >
      <Heading
        as="h2"
        size="md"
        noOfLines={1}
        marginBottom="6"
        data-testid="settings-form-title"
      >
        {t("settings.title")}
      </Heading>
      <div css={settingsFormFieldsWrapperStyles}>
        <FormControl marginBottom={6}>
          <FormLabel>{t("settings.language")}</FormLabel>
          <Select
            data-testid="settings-form-language-select"
            {...register("language")}
            css={settingsFormLanguageSelectStyles}
          >
            {map(languages, (lang) => (
              <option
                defaultValue={i18n.language}
                value={lang}
                key={lang}
                data-testid={`settings-form-language-select-item-${lang}`}
              >
                {t(`languages.${lang}`)}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          colorScheme="purple"
          padding="4"
          data-testid="settings-form-submit-button"
        >
          {t("settings.actions.submit")}
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
