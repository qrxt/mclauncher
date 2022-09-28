import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./assets/locales/en.json";
import ru from "./assets/locales/ru.json";

export const resources = {
  en,
  ru,
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
