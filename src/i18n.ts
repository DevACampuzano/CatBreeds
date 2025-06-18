import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
//import locales
import en from "./locales/en.json";
import es from "./locales/es.json";

const lenguages = ["en", "es"];
const deviceLanguage = lenguages.includes(getLocales()[0].languageCode)
  ? getLocales()[0].languageCode
  : "en";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
