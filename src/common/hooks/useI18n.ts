import { useTranslation as useTranslationI18n } from "react-i18next";

export const useTranslation = () => {
  const { t, i18n } = useTranslationI18n();
  const changeLanguage = () => {
    const currentLanguage = i18n.language;

    i18n.changeLanguage(currentLanguage === "en" ? "es" : "en");
  };
  return {
    t,
    i18n,
    changeLanguage,
  };
};
