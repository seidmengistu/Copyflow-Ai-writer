export interface Language {
  code: string;
  /** English name. */
  label: string;
  /** Native name shown in the dropdown. */
  native: string;
  /** Right-to-left script (Arabic, Persian, Hebrew…). */
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English" },
  // European
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "ru", label: "Russian", native: "Русский" },
  // Gulf / MENA / wider
  { code: "ar", label: "Arabic", native: "العربية", rtl: true },
  { code: "fa", label: "Persian", native: "فارسی", rtl: true },
  { code: "he", label: "Hebrew", native: "עברית", rtl: true },
  { code: "ur", label: "Urdu", native: "اردو", rtl: true },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia" },
];

const byCode = new Map(LANGUAGES.map((l) => [l.code, l]));

export function getLanguage(code: string): Language | undefined {
  return byCode.get(code);
}

export const DEFAULT_LANGUAGE = "en";
