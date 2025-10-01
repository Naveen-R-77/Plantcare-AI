import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { DiseaseDetection } from "@/lib/models"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const userId = new ObjectId(decoded.userId)

    const { imageUrl, detectedDisease, confidence, severity, treatmentRecommendations, plantType, location } =
      await request.json()

    const db = await getDatabase()
    const detections = db.collection<DiseaseDetection>("disease_detections")

    const newDetection: Omit<DiseaseDetection, "_id"> = {
      userId,
      imageUrl,
      detectedDisease,
      confidence,
      severity,
      treatmentRecommendations,
      plantType,
      detectionDate: new Date(),
      location,
    }

    const result = await detections.insertOne(newDetection)

    return NextResponse.json({
      message: "Disease detection saved",
      detectionId: result.insertedId,
    })
  } catch (error) {
    console.error("Disease detection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const userId = new ObjectId(decoded.userId)

    const db = await getDatabase()
    const detections = db.collection<DiseaseDetection>("disease_detections")

    const userDetections = await detections.find({ userId }).sort({ detectionDate: -1 }).limit(50).toArray()

    return NextResponse.json({ detections: userDetections })
  } catch (error) {
    console.error("Get detections error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
