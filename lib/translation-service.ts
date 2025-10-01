"use client"

import { useState, useEffect, useCallback } from 'react'

interface TranslationCache {
  [key: string]: {
    [language: string]: string
  }
}

class TranslationService {
  private cache: TranslationCache = {}
  private pendingTranslations = new Map<string, Promise<string>>()

  async translateText(text: string, targetLanguage: string, context?: string): Promise<string> {
    // Return original text if target is English
    if (targetLanguage === 'en') {
      return text
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, context)
    if (this.cache[cacheKey]?.[targetLanguage]) {
      return this.cache[cacheKey][targetLanguage]
    }

    // Check if translation is already pending
    const pendingKey = `${cacheKey}-${targetLanguage}`
    if (this.pendingTranslations.has(pendingKey)) {
      return this.pendingTranslations.get(pendingKey)!
    }

    // Create new translation promise
    const translationPromise = this.performTranslation(text, targetLanguage, context)
    this.pendingTranslations.set(pendingKey, translationPromise)

    try {
      const result = await translationPromise
      
      // Cache the result
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {}
      }
      this.cache[cacheKey][targetLanguage] = result

      return result
    } finally {
      this.pendingTranslations.delete(pendingKey)
    }
  }

  private async performTranslation(text: string, targetLanguage: string, context?: string): Promise<string> {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage,
          context
        })
      })

      if (!response.ok) {
        throw new Error('Translation API failed')
      }

      const data = await response.json()
      return data.translatedText || text
    } catch (error) {
      console.error('Translation error:', error)
      return text // Fallback to original text
    }
  }

  private getCacheKey(text: string, context?: string): string {
    return context ? `${text}|${context}` : text
  }

  // Batch translate multiple texts
  async translateBatch(texts: Array<{text: string, context?: string}>, targetLanguage: string): Promise<string[]> {
    const promises = texts.map(({text, context}) => 
      this.translateText(text, targetLanguage, context)
    )
    return Promise.all(promises)
  }

  // Clear cache
  clearCache(): void {
    this.cache = {}
  }
}

// Singleton instance
export const translationService = new TranslationService()

// Hook for using translations in components
export function useTranslation(language: string) {
  const [translations, setTranslations] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)

  const translate = useCallback(async (text: string, context?: string): Promise<string> => {
    if (language === 'en') {
      return text
    }

    const cacheKey = context ? `${text}|${context}` : text
    
    // Return cached translation if available
    if (translations[cacheKey]) {
      return translations[cacheKey]
    }

    setIsLoading(true)
    try {
      const translatedText = await translationService.translateText(text, language, context)
      
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }))

      return translatedText
    } finally {
      setIsLoading(false)
    }
  }, [language, translations])

  const translateMultiple = useCallback(async (texts: Array<{text: string, context?: string}>): Promise<string[]> => {
    if (language === 'en') {
      return texts.map(t => t.text)
    }

    setIsLoading(true)
    try {
      const results = await translationService.translateBatch(texts, language)
      
      // Update cache
      const newTranslations: {[key: string]: string} = {}
      texts.forEach((item, index) => {
        const cacheKey = item.context ? `${item.text}|${item.context}` : item.text
        newTranslations[cacheKey] = results[index]
      })
      
      setTranslations(prev => ({
        ...prev,
        ...newTranslations
      }))

      return results
    } finally {
      setIsLoading(false)
    }
  }, [language])

  return {
    translate,
    translateMultiple,
    isLoading,
    clearCache: () => {
      setTranslations({})
      translationService.clearCache()
    }
  }
}
