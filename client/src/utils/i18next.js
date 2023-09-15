import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

i18next
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
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
