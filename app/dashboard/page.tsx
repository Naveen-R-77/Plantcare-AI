"use client"

import { DiseaseDetection } from "@/components/disease-detection"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Leaf, TrendingUp, Activity } from "lucide-react"
import { TranslatedText, TranslatedHeading, TranslatedParagraph } from "@/components/translated-text"
import { useLanguage } from "@/lib/language-context"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
          <div className="space-y-2">
            <span className="text-lg font-medium text-foreground">{t.common.loading} Dashboard</span>
            <span className="text-sm text-muted-foreground">Preparing your plant health analysis tools...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-slide-up glass-effect rounded-xl p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {t.common.welcome}, {user.name || user.email}
                    </h1>
                    <p className="text-muted-foreground">
                      {t.dashboard.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="feature-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Activity className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t.dashboard.healthScore}</span>
                    <p className="text-2xl font-bold text-success">92%</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t.dashboard.plantsAnalyzed}</span>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <TrendingUp className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t.dashboard.improvement}</span>
                    <p className="text-2xl font-bold text-warning">+15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {t.dashboard.sectionTitle}
            </h2>
            <p className="text-muted-foreground">
              {t.dashboard.sectionDescription}
            </p>
          </div>

          <DiseaseDetection />
        </div>
      </main>
    </div>
  )
}
