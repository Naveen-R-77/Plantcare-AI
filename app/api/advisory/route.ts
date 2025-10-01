import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'nodejs'

// Define the structure of a row in the CSV data
interface CropData {
  'Crop Category': string;
  'Crops/Plants': string;
  'Typical Soil pH': string;
  'Nitrogen (kg/ha)': string;
  'Soil Depth (cm)': string;
}

// Enhanced interface for Gemini-powered recommendations
interface GeminiCropRecommendation {
  cropName: string;
  category: string;
  suitabilityScore: number;
  reasons: string[];
  plantingTips: string[];
  expectedYield: string;
  growthDuration: string;
  marketValue: string;
  riskFactors: string[];
  seasonalAdvice: string;
}

// Function to parse the CSV data from the file
async function getCropData(): Promise<CropData[]> {
  const filePath = path.join(process.cwd(), 'app', 'data', 'CropCategory-CropsPlants-TypicalSoilpH-Nitrogenkgha-SoilDepthcm.csv');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const rows = fileContent.split('\n').slice(1); // Skip header row

  return rows.map(row => {
    const [category, plants, ph, nitrogen, depth] = row.split(',').map(item => item.trim().replace(/"/g, ''));
    return {
      'Crop Category': category,
      'Crops/Plants': plants,
      'Typical Soil pH': ph,
      'Nitrogen (kg/ha)': nitrogen,
      'Soil Depth (cm)': depth,
    };
  });
}

// Helper function to check if a value is within a given range
function isWithinRange(value: number, range: string): boolean {
  if (!range) return false;
  const [min, max] = range.split(' - ').map(Number);
  return value >= min && value <= max;
}

// Gemini-powered crop advisory function
async function getGeminiCropRecommendations(soilData: {
  ph: number;
  nitrogen: number;
  depth: number;
  phosphorus?: number;
  potassium?: number;
  organicMatter?: number;
  moisture?: number;
}, location?: string, season?: string, weather?: any, language: string = "en"): Promise<GeminiCropRecommendation[]> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create language-specific prompts
    const languageInstructions = {
      en: "You are an expert agricultural advisor and crop consultant. Analyze the following soil and weather conditions to provide detailed crop recommendations.",
      ta: "நீங்கள் ஒரு நிபுணத்துவம் வாய்ந்த வேளாண்மை ஆலோசகர் மற்றும் பயிர் ஆலோசகர். பின்வரும் மண் மற்றும் வானிலை நிலைமைகளை பகுப்பாய்வு செய்து விரிவான பயிர் பரிந்துரைகளை வழங்கவும்.",
      hi: "आप एक विशेषज्ञ कृषि सलाहकार और फसल सलाहकार हैं। निम्नलिखित मिट्टी और मौसम की स्थिति का विश्लेषण करके विस्तृत फसल सिफारिशें प्रदान करें।",
      te: "మీరు నిపుణుడైన వ్యవసాయ సలహాదారు మరియు పంట సలహాదారు. క్రింది మట్టి మరియు వాతావరణ పరిస్థితులను విశ్లేషించి వివరణాత్మక పంట సిఫార్సులను అందించండి.",
      kn: "ನೀವು ಪರಿಣಿತ ಕೃಷಿ ಸಲಹೆಗಾರ ಮತ್ತು ಬೆಳೆ ಸಲಹೆಗಾರ. ಕೆಳಗಿನ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ವಿವರವಾದ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಒದಗಿಸಿ.",
      ml: "നിങ്ങൾ ഒരു വിദഗ്ധ കാർഷിക ഉപദേശകനും വിള ഉപദേശകനുമാണ്. ഇനിപ്പറയുന്ന മണ്ണിന്റെയും കാലാവസ്ഥയുടെയും അവസ്ഥകൾ വിശകലനം ചെയ്ത് വിശദമായ വിള ശുപാർശകൾ നൽകുക."
    };

    const responseLanguageInstructions = {
      en: "Provide all responses in English.",
      ta: "அனைத்து பதில்களையும் தமிழில் வழங்கவும்.",
      hi: "सभी उत्तर हिंदी में प्रदान करें।",
      te: "అన్ని సమాధానాలను తెలుగులో అందించండి.",
      kn: "ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಒದಗಿಸಿ.",
      ml: "എല്ലാ ഉത്തരങ്ങളും മലയാളത്തിൽ നൽകുക."
    };

    const langInstruction = languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en;
    const responseLangInstruction = responseLanguageInstructions[language as keyof typeof responseLanguageInstructions] || responseLanguageInstructions.en;

    const prompt = `${langInstruction} ${responseLangInstruction}

**Soil Parameters:**
- pH Level: ${soilData.ph}
- Nitrogen: ${soilData.nitrogen} kg/ha
- Soil Depth: ${soilData.depth} cm
- Phosphorus: ${soilData.phosphorus || 'Not provided'} ppm
- Potassium: ${soilData.potassium || 'Not provided'} ppm
- Organic Matter: ${soilData.organicMatter || 'Not provided'}%
- Moisture: ${soilData.moisture || 'Not provided'}%

**Current Weather Conditions:**
- Location: ${location || 'Not specified'}
- Temperature: ${weather?.temperature || 'Not provided'}°C
- Humidity: ${weather?.humidity || 'Not provided'}%
- Rainfall: ${weather?.rainfall || 'Not provided'}mm
- Wind Speed: ${weather?.windSpeed || 'Not provided'} km/h
- Weather Forecast: ${weather?.forecast || 'Not provided'}
- Season: ${season || 'Current season'}

Please provide 5-7 crop recommendations in the following JSON format:
[
  {
    "cropName": "Crop name",
    "category": "Vegetables/Fruits/Grains/Herbs/etc",
    "suitabilityScore": 85,
    "reasons": ["Reason 1", "Reason 2", "Reason 3"],
    "plantingTips": ["Tip 1", "Tip 2", "Tip 3"],
    "expectedYield": "X tons per hectare",
    "growthDuration": "X months",
    "marketValue": "High/Medium/Low with brief explanation",
    "riskFactors": ["Risk 1", "Risk 2"],
    "seasonalAdvice": "Best planting time and seasonal considerations"
  }
]

Focus on:
1. Crops that match the soil pH and nutrient levels
2. Suitable crops for the given soil depth and moisture
3. Weather-appropriate crops for current temperature and humidity
4. Rainfall compatibility and irrigation requirements
5. Wind resistance and weather resilience
6. Economic viability and market demand
7. Climate suitability for the location
8. Seasonal timing based on current weather patterns
9. Sustainable farming practices
10. Risk assessment including weather-related risks
11. Practical planting and care advice for current conditions

Provide scientifically accurate recommendations with practical farming insights.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Clean the response and parse JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const recommendations: GeminiCropRecommendation[] = JSON.parse(cleanedText);
      
      // Validate and ensure we have proper data
      return recommendations.filter(rec => rec.cropName && rec.suitabilityScore).slice(0, 7);
    } catch (parseError) {
      console.error("Failed to parse Gemini crop recommendations:", parseError);
      throw new Error("Failed to parse AI recommendations");
    }

  } catch (error) {
    console.error("Gemini crop advisory error:", error);
    throw new Error("Failed to get AI-powered crop recommendations");
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const { 
      ph, 
      nitrogen, 
      depth, 
      phosphorus, 
      potassium, 
      organicMatter, 
      moisture, 
      location, 
      weather,
      season,
      language 
    } = requestData;
    
    console.log('🌱 Received crop advisory request:', {
      ph, nitrogen, depth, location, language,
      hasWeather: !!weather
    });

    if (ph === undefined || nitrogen === undefined || depth === undefined) {
      console.error('❌ Missing required parameters');
      return NextResponse.json({ 
        error: 'Missing required soil parameters (pH, nitrogen, depth)',
        success: false 
      }, { status: 400 });
    }

    // Try Gemini AI first for enhanced recommendations
    try {
      console.log('🤖 Attempting Gemini AI recommendations...');
      const geminiRecommendations = await getGeminiCropRecommendations({
        ph,
        nitrogen,
        depth,
        phosphorus,
        potassium,
        organicMatter,
        moisture
      }, location, season, weather, language || "en");

      console.log('✅ Gemini recommendations received:', geminiRecommendations.length);
      
      return NextResponse.json({
        success: true,
        source: 'gemini-ai',
        recommendations: geminiRecommendations,
        totalCount: geminiRecommendations.length
      });

    } catch (geminiError) {
      console.log('⚠️ Gemini AI failed, falling back to CSV data:', geminiError);
      
      try {
        // Fallback to CSV-based recommendations
        const cropData = await getCropData();
        console.log('📊 Loaded CSV data:', cropData.length, 'crops');
        
        const recommendedCrops = cropData.filter(crop => {
          const phMatch = isWithinRange(ph, crop['Typical Soil pH']);
          const nitrogenMatch = isWithinRange(nitrogen, crop['Nitrogen (kg/ha)']);
          const depthMatch = isWithinRange(depth, crop['Soil Depth (cm)']);
          return phMatch && nitrogenMatch && depthMatch;
        });

        console.log('📋 CSV-based recommended crops:', recommendedCrops.length);
        
        // If no matches found, provide some general recommendations
        if (recommendedCrops.length === 0) {
          console.log('🔄 No exact matches, providing general recommendations');
          const generalRecommendations = cropData.slice(0, 5); // First 5 crops as general recommendations
          
          return NextResponse.json({
            success: true,
            source: 'csv-general',
            recommendations: generalRecommendations,
            totalCount: generalRecommendations.length,
            note: 'No exact matches found. Showing general crop recommendations.'
          });
        }
        
        return NextResponse.json({
          success: true,
          source: 'csv-fallback',
          recommendations: recommendedCrops,
          totalCount: recommendedCrops.length,
          note: 'Using database recommendations. AI service temporarily unavailable.'
        });
        
      } catch (csvError) {
        console.error('💥 CSV fallback also failed:', csvError);
        
        // Final fallback with hardcoded recommendations
        const hardcodedRecommendations = [
          {
            'Crop Category': 'Vegetables',
            'Crops/Plants': 'Tomato',
            'Typical Soil pH': '6.0 - 7.0',
            'Nitrogen (kg/ha)': '100 - 150',
            'Soil Depth (cm)': '15 - 30'
          },
          {
            'Crop Category': 'Vegetables',
            'Crops/Plants': 'Potato',
            'Typical Soil pH': '5.5 - 6.5',
            'Nitrogen (kg/ha)': '80 - 120',
            'Soil Depth (cm)': '20 - 40'
          },
          {
            'Crop Category': 'Grains',
            'Crops/Plants': 'Rice',
            'Typical Soil pH': '5.5 - 7.0',
            'Nitrogen (kg/ha)': '100 - 200',
            'Soil Depth (cm)': '10 - 25'
          }
        ];
        
        return NextResponse.json({
          success: true,
          source: 'hardcoded-fallback',
          recommendations: hardcodedRecommendations,
          totalCount: hardcodedRecommendations.length,
          note: 'Using basic recommendations. Please try again later for personalized suggestions.'
        });
      }
    }

  } catch (error) {
    console.error('💥 Critical error in crop advisory API:', error);
    return NextResponse.json({ 
      success: false,
      error: 'An internal server error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
