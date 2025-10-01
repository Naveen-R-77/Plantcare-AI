"use client"

import { CropAdvisory } from "@/components/crop-advisory"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdvisoryPage() {
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
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
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
        <div className="space-y-8 glass-effect rounded-xl p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Crop Advisory System</h1>
            <p className="text-muted-foreground">
              Get personalized crop recommendations based on your soil parameters and local weather conditions
            </p>
          </div>
          <CropAdvisory />
        </div>
      </main>
    </div>
  )
}
