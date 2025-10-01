import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { location } = await request.json()

    if (!location) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 })
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    You are an expert agricultural advisor. For the location "${location}", analyze the soil and climate conditions internally and provide ONLY the final actionable recommendations for farmers.

    DO NOT show technical soil parameters (pH, NPK values, ppm, etc.) in your response. Instead, provide practical farming advice based on your internal analysis.

    ## CROP ADVISORY FOR: ${location}

    Analyze ${location} internally for soil conditions, climate, and agricultural suitability, then provide:

    ### 🌾 RECOMMENDED CROPS
    List 5 best crops for ${location} with:
    - Why each crop is perfect for this location
    - Expected yield per hectare
    - Best planting season
    - Market potential

    ### 🌱 FARMING RECOMMENDATIONS
    - What fertilizers to use and when
    - Irrigation schedule and water management
    - Pest and disease prevention
    - Soil improvement techniques

    ### 📅 SEASONAL FARMING CALENDAR
    Month-by-month activities:
    - Land preparation timing
    - Sowing/planting dates
    - Fertilizer application schedule
    - Harvesting periods

    ### 💰 ECONOMIC ANALYSIS
    - Investment required per hectare
    - Expected income from recommended crops
    - Profit margins
    - Government schemes available

    ### 🎯 SPECIFIC ACTIONS FOR FARMERS
    - Immediate steps to take this season
    - Long-term soil health improvement
    - Crop rotation plan
    - Marketing strategies

    IMPORTANT: 
    - Do NOT mention technical soil parameters (pH, nitrogen levels, etc.)
    - Focus on PRACTICAL farming advice
    - Make recommendations specific to ${location}
    - Use farmer-friendly language
    - Provide actionable steps
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      analysis: text,
      location: location,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Soil analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate soil analysis' }, 
      { status: 500 }
    )
  }
}
