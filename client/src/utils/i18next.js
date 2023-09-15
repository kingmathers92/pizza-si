import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HTTPApi from "i18next-http-backend";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HTTPApi)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "it", "fr"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
    },
    backend: {
      loadPath: "/locales{{lng}}/translation.json",
    },
  });

export default i18next;
