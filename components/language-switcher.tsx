"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState("English")
  
  const languages = [
    "English",
    "हिंदी (Hindi)",
    "தமிழ் (Tamil)",
    "తెలుగు (Telugu)",
    "ಕನ್ನಡ (Kannada)",
    "മലയാളം (Malayalam)"
  ]

  console.log('LanguageSwitcher rendered')

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 min-w-[120px]"
            onClick={() => console.log('Button clicked!')}
          >
            <Globe className="h-4 w-4" />
            <span>{selectedLang}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-white border shadow-lg z-50"
          style={{ 
            backgroundColor: 'white', 
            border: '1px solid #ccc', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 9999
          }}
        >
          {languages.map((lang, index) => (
            <DropdownMenuItem 
              key={index}
              onClick={() => {
                console.log('Selected:', lang)
                setSelectedLang(lang)
              }}
              className="cursor-pointer hover:bg-gray-100 px-3 py-2"
            >
              {lang}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
