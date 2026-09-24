"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "he";

interface LanguageContextValue {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const didMount = useRef(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    const browserLanguage = navigator.language.toLowerCase();
    const initialLanguage: Language =
      savedLanguage === "he" || savedLanguage === "en"
        ? savedLanguage
        : browserLanguage.startsWith("he")
          ? "he"
          : "en";

    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.dataset.language = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "he" : "en");
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({
      language,
      direction: language === "he" ? ("rtl" as const) : ("ltr" as const),
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
