import i18n from 'i18next';
import { initReactI18next } from '../../node_modules/react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';
import Backend from 'i18next-http-backend';  // Optional, for loading translations from files

// Translation resources for the languages
const resources = {
  en: {
    translation: {
      name: "name",
      email: "email",
      phone:"phone",
      company:"company",
      Actions:"Actions"
    },
  },
  hi: {
    translation: {
      name: "नाम",
      email: "ईमेल",
      phone:"फ़ोन",
      company:"कंपनी",
      Actions:"कार्रवाई"
    },
  },
  mr: {
    translation: {
      name: "नाव",
      email: "ईमेल",
      phone:"फ़ोन",
      company:"कंपनी",
      Actions:"क्रिया",
    },
  },
};

// Initialize i18next
i18n
  .use(Backend) // Optional: If you want to load translations from external files
  .use(LanguageDetector) // Automatically detect language from browser or localStorage
  .use(initReactI18next)
  .init({
    resources,  // Load resources inline
    lng: localStorage.getItem('language') || 'en', // Default language from localStorage or fallback to English
    fallbackLng: 'en', // Fallback to English if the language is not available
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
