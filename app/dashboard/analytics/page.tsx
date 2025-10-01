"use client"

import { PlantHealthDashboard } from "@/components/plant-health-dashboard"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
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
            <p className="text-lg font-medium text-foreground">Loading Analytics</p>
            <p className="text-sm text-muted-foreground">Preparing your plant health dashboard...</p>
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
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Plant Health Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your plant health monitoring and disease detection history
            </p>
          </div>
          <PlantHealthDashboard />
        </div>
      </main>
    </div>
  )
}
