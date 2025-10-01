import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"

export const metadata: Metadata = {
  title: {
    default: "PlantCare AI - Plant Disease Detection",
    template: "%s | PlantCare AI"
  },
  description: "AI-powered plant disease detection and crop advisory platform with multilingual support for farmers",
  keywords: ["plant disease", "crop advisory", "agriculture", "AI", "farming", "plant health", "disease detection"],
  authors: [{ name: "PlantCare AI Team" }],
  creator: "PlantCare AI",
  publisher: "PlantCare AI",
  generator: "Next.js",
  applicationName: "PlantCare AI",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://plantcare-ai.vercel.app',
    siteName: 'PlantCare AI',
    title: 'PlantCare AI - Plant Disease Detection',
    description: 'AI-powered plant disease detection and crop advisory platform with multilingual support for farmers',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PlantCare AI - Plant Disease Detection Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlantCare AI - Plant Disease Detection',
    description: 'AI-powered plant disease detection and crop advisory platform',
    images: ['/og-image.png'],
    creator: '@plantcareai',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen bg-background agricultural-gradient font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LanguageProvider>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
