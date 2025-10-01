import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  phone?: string
  location?: string
  preferredLanguage: "en" | "ta"
  createdAt: Date
  updatedAt: Date
}

export interface DiseaseDetection {
  _id?: ObjectId
  userId: ObjectId
  imageUrl: string
  detectedDisease: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  treatmentRecommendations: string[]
  plantType: string
  detectionDate: Date
  location?: {
    latitude: number
    longitude: number
  }
}

export interface ChatMessage {
  _id?: ObjectId
  userId: ObjectId
  message: string
  response: string
  timestamp: Date
  messageType: "text" | "voice"
  language: "en" | "ta"
}

export interface SoilAnalysis {
  _id?: ObjectId
  userId: ObjectId
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  moisture: number
  temperature: number
  location: string
  analysisDate: Date
  recommendations: string[]
}

export interface CropRecommendation {
  _id?: ObjectId
  userId: ObjectId
  soilAnalysisId: ObjectId
  recommendedCrops: {
    name: string
    suitability: number
    plantingPeriod: string
    expectedYield: string
    tips: string[]
  }[]
  weatherConditions: {
    temperature: number
    humidity: number
    rainfall: number
  }
  createdAt: Date
}
