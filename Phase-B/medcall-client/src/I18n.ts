import ar from "./locales/ar.json";
import en from "./locales/en.json";
import he from "./locales/he.json";
import ru from "./locales/ru.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languageResources = {
  en: { translation: en },
  he: { translation: he },
  ar: { translation: ar },
  ru: { translation: ru },
};

const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: selectedLanguage,
  fallbackLng: "en",
  resources: languageResources,
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
