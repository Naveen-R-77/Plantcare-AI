import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"

export const metadata: Metadata = {
  title: "PlantCare AI - Plant Disease Detection",
  description: "AI-powered plant disease detection and crop advisory platform",
  generator: "v0.app",
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
