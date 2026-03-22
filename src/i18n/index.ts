import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/en/common.json";
import bnCommon from "../locales/bn/common.json";

const resources = {
  en: {
    translation: enCommon,
  },
  bn: {
    translation: bnCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "bn", // Default language is Bengali as per original project
    debug: false,
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  });

export default i18n;
