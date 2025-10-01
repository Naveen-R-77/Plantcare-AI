"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/i18n"

export function SimpleLanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const languages = [
    { code: "en", display: "English" },
    { code: "hi", display: "हिंदी (Hindi)" },
    { code: "ta", display: "தமிழ் (Tamil)" },
    { code: "te", display: "తెలుగు (Telugu)" },
    { code: "kn", display: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", display: "മലയാളം (Malayalam)" }
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  console.log('SimpleLanguageSwitcher rendered, current language:', language, 'isOpen:', isOpen)
  console.log('Current language display:', currentLanguage.display)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 min-w-[120px]"
        onClick={() => {
          console.log('Button clicked! Current isOpen:', isOpen)
          setIsOpen(!isOpen)
        }}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.display}</span>
      </Button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 9999,
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px'
          }}
        >
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Available Languages
            </div>
            {languages.map((lang, index) => (
              <div
                key={index}
                className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors duration-150 ${
                  language === lang.code 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => {
                  console.log('Selected language:', lang.code, lang.display)
                  setLanguage(lang.code as Language)
                  setIsOpen(false)
                }}
                style={{
                  color: language === lang.code ? '#1d4ed8' : '#374151',
                  backgroundColor: language === lang.code ? '#eff6ff' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (language !== lang.code) {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                    e.currentTarget.style.color = '#111827'
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== lang.code) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{lang.display}</span>
                  {language === lang.code && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
