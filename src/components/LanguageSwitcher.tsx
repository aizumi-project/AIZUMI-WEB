"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
      {(["JP", "EN"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300
            ${lang === l 
              ? "bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              : "text-gray-500 hover:text-white"
            }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}