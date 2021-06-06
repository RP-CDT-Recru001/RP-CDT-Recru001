import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';

export const resources = {
  en: {
    translation: translationEN
  }
} as const;

export type DefaultResources = keyof typeof resources['en']['translation'];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: true
});

export default i18n;
