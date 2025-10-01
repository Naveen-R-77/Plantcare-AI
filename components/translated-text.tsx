"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useTranslation } from '@/lib/translation-service'

interface TranslatedTextProps {
  children: string
  context?: string
  className?: string
  fallback?: string
  as?: keyof JSX.IntrinsicElements
}

export function TranslatedText({ 
  children, 
  context, 
  className, 
  fallback,
  as: Component = 'span' 
}: TranslatedTextProps) {
  const { language } = useLanguage()
  const { translate, isLoading } = useTranslation(language)
  const [translatedText, setTranslatedText] = useState<string>(children)

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(children)
      return
    }

    const performTranslation = async () => {
      try {
        const result = await translate(children, context)
        // Clean up the translated text
        const cleanedResult = result
          .replace(/^["']|["']$/g, '') // Remove quotes at start/end
          .replace(/^Translation:\s*/i, '') // Remove "Translation:" prefix
          .replace(/^Translated text:\s*/i, '') // Remove "Translated text:" prefix
          .replace(/^\s+|\s+$/g, '') // Trim whitespace
          .replace(/\n+/g, ' ') // Replace newlines with spaces
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\*\*/g, '') // Remove markdown bold markers
          .replace(/\*/g, '') // Remove markdown italic markers
        setTranslatedText(cleanedResult)
      } catch (error) {
        console.error('Translation failed:', error)
        setTranslatedText(fallback || children)
      }
    }

    performTranslation()
  }, [children, language, context, translate, fallback])

  // Get appropriate font class based on language
  const getFontClass = (lang: string) => {
    switch (lang) {
      case 'hi':
      case 'mr':
        return 'font-devanagari'
      case 'ta':
        return 'font-tamil'
      case 'te':
        return 'font-telugu'
      case 'kn':
        return 'font-kannada'
      case 'ml':
        return 'font-malayalam'
      case 'gu':
        return 'font-gujarati'
      case 'bn':
        return 'font-bengali'
      case 'pa':
        return 'font-punjabi'
      default:
        return ''
    }
  }

  const fontClass = getFontClass(language)
  const combinedClassName = `${className || ''} ${fontClass}`.trim()

  return (
    <Component className={combinedClassName} dir="auto">
      {isLoading && language !== 'en' ? (
        <span className="opacity-70 animate-pulse">{children}</span>
      ) : (
        <span className="inline-block">{translatedText}</span>
      )}
    </Component>
  )
}

// Specialized components for common use cases
export function TranslatedHeading({ children, level = 1, className, context }: {
  children: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  context?: string
}) {
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <TranslatedText 
      as={HeadingComponent} 
      className={className} 
      context={context || 'heading'}
    >
      {children}
    </TranslatedText>
  )
}

export function TranslatedButton({ children, className, context, ...props }: {
  children: string
  className?: string
  context?: string
  [key: string]: any
}) {
  const { language } = useLanguage()
  const { translate } = useTranslation(language)
  const [translatedText, setTranslatedText] = useState<string>(children)

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(children)
      return
    }

    translate(children, context || 'button').then(setTranslatedText)
  }, [children, language, context, translate])

  return (
    <button className={className} {...props}>
      {translatedText}
    </button>
  )
}

export function TranslatedParagraph({ children, className, context }: {
  children: string
  className?: string
  context?: string
}) {
  return (
    <TranslatedText 
      as="p" 
      className={className} 
      context={context || 'paragraph'}
    >
      {children}
    </TranslatedText>
  )
}
