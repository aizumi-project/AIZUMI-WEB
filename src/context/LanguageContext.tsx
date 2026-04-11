"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Language = "JP" | "EN";

interface LanguageContextType {
  readonly lang: Language;
  readonly setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Propsの型を Readonly で定義 (S6759 対策)
export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lang, setLang] = useState<Language>("JP");

  useEffect(() => {
    const savedLang = localStorage.getItem("aizumi-language-pref") as Language;
    if (savedLang && (savedLang === "JP" || savedLang === "EN")) {
      setLang(savedLang);
    }
  }, []);

  // 関数も再生成を防ぐために useCallback でラップ
  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("aizumi-language-pref", newLang);
  }, []);

  // 提供する値を useMemo でキャッシュ (S6481 対策)
  const contextValue = useMemo(() => ({
    lang,
    setLang: handleSetLang
  }), [lang, handleSetLang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}