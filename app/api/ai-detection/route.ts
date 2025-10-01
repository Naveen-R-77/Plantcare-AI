import { type NextRequest, NextResponse } from "next/server"
import { detectPlantDisease, getPredictiveAnalysis } from "@/lib/ai-services"
import { getDatabase } from "@/lib/mongodb"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { image, location, language } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Detect disease using AI services
    console.log("Starting disease detection...");
    console.log("Image data length:", image?.length || 0);
    console.log("Gemini API Key available:", !!process.env.GEMINI_API_KEY);
    console.log("Gemini API Key (first 10 chars):", process.env.GEMINI_API_KEY?.substring(0, 10) || "Not set");
    
    const diseaseResult = await detectPlantDisease(image, language || "en")
    console.log("Disease detection completed:", diseaseResult.disease);

    // Get predictive analysis based on location
    let predictiveAnalysis = null
    if (location) {
      predictiveAnalysis = await getPredictiveAnalysis(location)
    }

    // Save to database
    const db = await getDatabase()
    const detection = {
      userId: decoded.userId,
      disease: diseaseResult.disease,
      confidence: diseaseResult.confidence,
      severity: diseaseResult.severity,
      treatment: diseaseResult.treatment,
      description: diseaseResult.description,
      prevention: diseaseResult.prevention,
      predictiveAnalysis,
      imageData: image.substring(0, 100) + "...", // Store partial image data
      timestamp: new Date(),
      location: location || "Unknown",
    }

    const insertResult = await db.collection("disease_detections").insertOne(detection)

    return NextResponse.json({
      success: true,
      result: diseaseResult,
      predictiveAnalysis,
      detectionId: insertResult.insertedId,
    })
  } catch (error) {
    console.error("AI detection error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const db = await getDatabase()
    const detections = await db
      .collection("disease_detections")
      .find({ userId: decoded.userId })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray()

    return NextResponse.json({ detections })
  } catch (error) {
    console.error("Get detections error:", error)
    return NextResponse.json({ error: "Failed to fetch detection history" }, { status: 500 })
  }
}
