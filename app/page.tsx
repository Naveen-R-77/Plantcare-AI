"use client"

import { AuthForm } from "@/components/auth-form"
import { Leaf, Camera, MessageCircle, TrendingUp, Shield, Zap, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { TranslatedText, TranslatedHeading, TranslatedParagraph } from "@/components/translated-text"

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-glow">
                <Leaf className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <TranslatedHeading level={1} className="text-2xl font-bold text-gradient" context="app-title">
                  PlantCare AI
                </TranslatedHeading>
                <TranslatedText className="text-sm text-muted-foreground" context="app-subtitle">
                  Smart Agriculture Solutions
                </TranslatedText>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <TranslatedText context="badge">Secure & Private</TranslatedText>
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <TranslatedText context="badge">AI-Powered</TranslatedText>
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <TranslatedText context="badge">Global Access</TranslatedText>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Hero Content */}
          <div className="space-y-10 animate-slide-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                <Leaf className="h-4 w-4" />
                <TranslatedText context="tagline">AI-Powered Plant Health</TranslatedText>
              </div>
              <h2 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
                <span className="text-balance">
                  <TranslatedText className="text-gradient" context="hero-title">Revolutionize Your Agriculture</TranslatedText>
                </span>
              </h2>
              <TranslatedParagraph className="text-xl text-muted-foreground text-pretty leading-[1.625]" context="hero-description">
                Harness the power of artificial intelligence to detect plant diseases instantly, get expert treatment recommendations, and optimize your crop yields with personalized agricultural insights.
              </TranslatedParagraph>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="feature-card group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <TranslatedHeading level={3} className="text-lg font-semibold text-card-foreground" context="feature-title">
                    Disease Detection
                  </TranslatedHeading>
                  <TranslatedParagraph className="text-sm text-muted-foreground leading-[1.625]" context="feature-description">
                    Advanced AI analysis identifies plant diseases from leaf images with 95% accuracy
                  </TranslatedParagraph>
                </div>
              </div>

              <div className="feature-card group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <TranslatedHeading level={3} className="text-lg font-semibold text-card-foreground" context="feature-title">
                    Expert AI Chatbot
                  </TranslatedHeading>
                  <TranslatedParagraph className="text-sm text-muted-foreground leading-[1.625]" context="feature-description">
                    Get instant expert advice through our intelligent conversational AI assistant
                  </TranslatedParagraph>
                </div>
              </div>

              <div className="feature-card group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <TranslatedHeading level={3} className="text-lg font-semibold text-card-foreground" context="feature-title">
                    Smart Crop Advisory
                  </TranslatedHeading>
                  <TranslatedParagraph className="text-sm text-muted-foreground leading-[1.625]" context="feature-description">
                    Personalized recommendations based on soil conditions and weather patterns
                  </TranslatedParagraph>
                </div>
              </div>

              <div className="feature-card group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <TranslatedHeading level={3} className="text-lg font-semibold text-card-foreground" context="feature-title">
                    Treatment Plans
                  </TranslatedHeading>
                  <TranslatedParagraph className="text-sm text-muted-foreground leading-[1.625]" context="feature-description">
                    Comprehensive treatment protocols with monitoring and prevention strategies
                  </TranslatedParagraph>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <TranslatedText className="text-sm text-muted-foreground" context="stat-label">Accuracy Rate</TranslatedText>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <TranslatedText className="text-sm text-muted-foreground" context="stat-label">Plants Analyzed</TranslatedText>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <TranslatedText className="text-sm text-muted-foreground" context="stat-label">AI Support</TranslatedText>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-md">
              <AuthForm />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <TranslatedText className="text-sm text-muted-foreground" context="footer">
                © 2025 PlantCare AI. Empowering sustainable agriculture.
              </TranslatedText>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <TranslatedText context="footer">Powered by Advanced AI</TranslatedText>
              <span>•</span>
              <TranslatedText context="footer">Secure & Private</TranslatedText>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
