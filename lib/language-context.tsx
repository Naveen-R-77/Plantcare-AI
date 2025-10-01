"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslation, type Translations } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [t, setT] = useState<Translations>(getTranslation("en"))

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "ta", "te", "kn", "ml", "gu", "mr", "bn", "pa"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
      setT(getTranslation(savedLanguage))
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language.split('-')[0] as Language
      const supportedLanguages = ["en", "hi", "ta", "te", "kn", "ml"]
      
      if (supportedLanguages.includes(browserLang)) {
        setLanguage(browserLang)
        setT(getTranslation(browserLang))
        localStorage.setItem("language", browserLang)
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    setT(getTranslation(lang))
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
