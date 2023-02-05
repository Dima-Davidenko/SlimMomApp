import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import EN from './locales/en/translation.json';
import RU from './locales/ru/translation.json';
import UK from './locales/uk/translation.json';

export const resources = {
  en: {
    translation: EN,
  },
  uk: {
    translation: UK,
  },
  ru: {
    translation: RU,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    // debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
