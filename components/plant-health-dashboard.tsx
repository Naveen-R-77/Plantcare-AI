"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, TrendingDown, CheckCircle, Leaf, BarChart3, Bell, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"

interface HealthMetric {
  name: string
  value: number
  trend: "up" | "down" | "stable"
  status: "excellent" | "good" | "warning" | "critical"
  description: string
}

interface DetectionHistory {
  id: string
  date: Date
  plantType: string
  disease: string
  severity: "Low" | "Medium" | "High"
  confidence: number
  treated: boolean
  imageUrl?: string
}

interface PlantProfile {
  id: string
  name: string
  type: string
  plantedDate: Date
  lastChecked: Date
  healthScore: number
  status: "healthy" | "monitoring" | "treatment" | "critical"
  detectionCount: number
}

export function PlantHealthDashboard() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([])
  const [detectionHistory, setDetectionHistory] = useState<DetectionHistory[]>([])
  const [plantProfiles, setPlantProfiles] = useState<PlantProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!token) return

      try {
        // Load detection history
        const historyResponse = await fetch("/api/ai-detection", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (historyResponse.ok) {
          const historyData = await historyResponse.json()
          const formattedHistory: DetectionHistory[] =
            historyData.detections?.map((detection: any) => ({
              id: detection._id,
              date: new Date(detection.timestamp),
              plantType: detection.plantType || "Unknown",
              disease: detection.disease,
              severity: detection.severity,
              confidence: detection.confidence * 100,
              treated: Math.random() > 0.5, // Mock treated status
              imageUrl: detection.imageData,
            })) || []

          setDetectionHistory(formattedHistory)

          // Generate health metrics based on detection history
          const metrics = generateHealthMetrics(formattedHistory)
          setHealthMetrics(metrics)

          // Generate plant profiles
          const profiles = generatePlantProfiles(formattedHistory)
          setPlantProfiles(profiles)
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
        // Load mock data as fallback
        loadMockData()
      }

      setIsLoading(false)
    }

    const loadMockData = () => {
      const mockMetrics: HealthMetric[] = [
        {
          name: "Overall Health Score",
          value: 87,
          trend: "up",
          status: "good",
          description: "Average health across all monitored plants",
        },
        {
          name: "Disease Detection Rate",
          value: 12,
          trend: "down",
          status: "excellent",
          description: "Percentage of plants with detected diseases",
        },
        {
          name: "Treatment Success Rate",
          value: 94,
          trend: "up",
          status: "excellent",
          description: "Percentage of successfully treated diseases",
        },
        {
          name: "Plants Under Monitoring",
          value: 24,
          trend: "stable",
          status: "good",
          description: "Number of plants being actively monitored",
        },
      ]

      const mockHistory: DetectionHistory[] = [
        {
          id: "1",
          date: new Date(Date.now() - 86400000),
          plantType: "Tomato",
          disease: "Late Blight",
          severity: "High",
          confidence: 92,
          treated: true,
        },
        {
          id: "2",
          date: new Date(Date.now() - 172800000),
          plantType: "Lettuce",
          disease: "Healthy Plant",
          severity: "Low",
          confidence: 95,
          treated: false,
        },
        {
          id: "3",
          date: new Date(Date.now() - 259200000),
          plantType: "Pepper",
          disease: "Bacterial Spot",
          severity: "Medium",
          confidence: 88,
          treated: true,
        },
      ]

      const mockProfiles: PlantProfile[] = [
        {
          id: "1",
          name: "Tomato Garden A",
          type: "Tomato",
          plantedDate: new Date(Date.now() - 7776000000),
          lastChecked: new Date(Date.now() - 86400000),
          healthScore: 92,
          status: "healthy",
          detectionCount: 3,
        },
        {
          id: "2",
          name: "Lettuce Bed B",
          type: "Lettuce",
          plantedDate: new Date(Date.now() - 5184000000),
          lastChecked: new Date(Date.now() - 172800000),
          healthScore: 88,
          status: "monitoring",
          detectionCount: 1,
        },
      ]

      setHealthMetrics(mockMetrics)
      setDetectionHistory(mockHistory)
      setPlantProfiles(mockProfiles)
    }

    loadDashboardData()
  }, [token])

  const generateHealthMetrics = (history: DetectionHistory[]): HealthMetric[] => {
    const totalDetections = history.length
    const diseaseDetections = history.filter((h) => h.disease !== "Healthy Plant").length
    const treatedCount = history.filter((h) => h.treated).length
    const avgConfidence = history.reduce((sum, h) => sum + h.confidence, 0) / totalDetections || 0

    return [
      {
        name: "Overall Health Score",
        value: Math.round(100 - (diseaseDetections / totalDetections) * 100) || 85,
        trend: "up",
        status: diseaseDetections < totalDetections * 0.2 ? "excellent" : "good",
        description: "Average health across all monitored plants",
      },
      {
        name: "Disease Detection Rate",
        value: Math.round((diseaseDetections / totalDetections) * 100) || 15,
        trend: "down",
        status: diseaseDetections < totalDetections * 0.2 ? "excellent" : "warning",
        description: "Percentage of plants with detected diseases",
      },
      {
        name: "Treatment Success Rate",
        value: Math.round((treatedCount / diseaseDetections) * 100) || 90,
        trend: "up",
        status: "excellent",
        description: "Percentage of successfully treated diseases",
      },
      {
        name: "Detection Confidence",
        value: Math.round(avgConfidence) || 88,
        trend: "stable",
        status: avgConfidence > 85 ? "excellent" : "good",
        description: "Average AI detection confidence level",
      },
    ]
  }

  const generatePlantProfiles = (history: DetectionHistory[]): PlantProfile[] => {
    const plantTypes = [...new Set(history.map((h) => h.plantType))]

    return plantTypes.map((type, index) => {
      const plantHistory = history.filter((h) => h.plantType === type)
      const diseaseCount = plantHistory.filter((h) => h.disease !== "Healthy Plant").length
      const healthScore = Math.round(100 - (diseaseCount / plantHistory.length) * 100) || 85

      return {
        id: (index + 1).toString(),
        name: `${type} Garden ${String.fromCharCode(65 + index)}`,
        type,
        plantedDate: new Date(Date.now() - Math.random() * 10000000000),
        lastChecked: plantHistory[0]?.date || new Date(),
        healthScore,
        status: healthScore > 90 ? "healthy" : healthScore > 70 ? "monitoring" : "treatment",
        detectionCount: plantHistory.length,
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Health Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="feature-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {metric.value}
                      {metric.name.includes("Rate") ||
                      metric.name.includes("Score") ||
                      metric.name.includes("Confidence")
                        ? "%"
                        : ""}
                    </span>
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>
                <Badge className={cn("text-xs", getStatusColor(metric.status))}>{metric.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plants">Plant Profiles</TabsTrigger>
          <TabsTrigger value="history">Detection History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {detectionHistory.slice(0, 5).map((detection) => (
                  <div key={detection.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{detection.plantType}</p>
                      <p className="text-xs text-muted-foreground">{detection.disease}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={cn("text-xs", getSeverityColor(detection.severity))}>
                        {detection.severity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{detection.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Health Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Overall Health</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Disease Prevention</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Treatment Success</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Monitoring Coverage</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plants" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Plant Profiles</h3>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Set Alerts
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plantProfiles.map((plant) => (
              <Card key={plant.id} className="feature-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plant.name}</CardTitle>
                    <Badge
                      variant={
                        plant.status === "healthy"
                          ? "default"
                          : plant.status === "monitoring"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {plant.status}
                    </Badge>
                  </div>
                  <CardDescription>{plant.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">{plant.healthScore}%</span>
                    </div>
                    <Progress value={plant.healthScore} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Planted</p>
                      <p className="font-medium">{plant.plantedDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Check</p>
                      <p className="font-medium">{plant.lastChecked.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">{plant.detectionCount} detections</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Detection History</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {detectionHistory.map((detection, index) => (
                  <div
                    key={detection.id}
                    className={cn(
                      "flex items-center gap-4 p-4 border-b last:border-b-0",
                      index % 2 === 0 ? "bg-muted/20" : "bg-background",
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{detection.plantType}</h4>
                        <Badge className={cn("text-xs", getSeverityColor(detection.severity))}>
                          {detection.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{detection.disease}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Confidence: {Math.round(detection.confidence)}%
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{detection.date.toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{detection.date.toLocaleTimeString()}</p>
                      {detection.treated && (
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600">Treated</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Late Blight", "Powdery Mildew", "Bacterial Spot", "Healthy Plant"].map((disease, index) => {
                  const count = detectionHistory.filter((h) => h.disease === disease).length
                  const percentage = Math.round((count / detectionHistory.length) * 100) || 0

                  return (
                    <div key={disease} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{disease}</span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Advanced analytics charts would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
