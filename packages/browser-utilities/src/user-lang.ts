const languages = {
  ca: 'ca',
  'ca-ES': 'ca',
  es: 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  'es-CO': 'es',
  'es-CL': 'es',
  'es-PE': 'es',
  'es-VE': 'es',
  'es-DO': 'es',
  en: 'en',
  'en-GB': 'en',
  'en-US': 'en',
  'en-CA': 'en',
  'en-IN': 'en',
  'en-AU': 'en',
  'en-NZ': 'en',
  'en-ZA': 'en',
};
const defaultLang = 'ca';
export function getUserLang() {
  for (const lang of navigator.languages) {
    const l = languages[lang];
    if (l) return l;
  }
  return defaultLang;
}

export const languageSelector = state => state?.localization?.language || 'ca';
