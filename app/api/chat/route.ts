import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { ChatMessage } from "@/lib/models"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      console.error('❌ No authorization token provided');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const userId = new ObjectId(decoded.userId)

    const { message, messageType, language } = await request.json()
    
    console.log('🤖 Processing chat message:', {
      userId: userId.toString(),
      messageLength: message?.length,
      language: language,
      messageType: messageType
    });

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 })
    }

    // Generate AI response using Gemini
    const aiResponse = await generateGeminiResponse(message, language || "en")
    
    console.log('✅ Generated AI response:', aiResponse ? 'Success' : 'Failed');

    try {
      const db = await getDatabase()
      const chatMessages = db.collection<ChatMessage>("chat_messages")

      const newMessage: Omit<ChatMessage, "_id"> = {
        userId,
        message,
        response: aiResponse,
        timestamp: new Date(),
        messageType: messageType || "text",
        language: language || "en",
      }

      const result = await chatMessages.insertOne(newMessage)
      console.log('💾 Saved to database:', result.insertedId);

      return NextResponse.json({
        success: true,
        message: "Chat message saved",
        response: aiResponse,
        messageId: result.insertedId,
      })
    } catch (dbError) {
      console.error('💥 Database error:', dbError);
      // Still return the AI response even if DB save fails
      return NextResponse.json({
        success: true,
        message: "Response generated (database temporarily unavailable)",
        response: aiResponse,
        messageId: null,
      })
    }
  } catch (error) {
    console.error("💥 Chat API error:", error)
    
    // Provide a helpful fallback response
    const fallbackResponse = "I'm experiencing some technical difficulties right now. Please try asking your question again, or contact support if the issue persists.";
    
    return NextResponse.json({ 
      success: false,
      error: "Internal server error",
      response: fallbackResponse,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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
    const chatMessages = db.collection<ChatMessage>("chat_messages")

    const userMessages = await chatMessages.find({ userId }).sort({ timestamp: -1 }).limit(100).toArray()

    return NextResponse.json({ messages: userMessages.reverse() })
  } catch (error) {
    console.error("Get chat messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function generateGeminiResponse(message: string, language: string): Promise<string> {
  try {
    console.log('🤖 Generating Gemini response for language:', language);
    
    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'demo' || apiKey === 'your-api-key-here') {
      console.warn('⚠️ No valid Gemini API key found, using fallback response');
      throw new Error('Gemini API key not configured');
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Create a specialized prompt for plant care
    const systemPrompt = language === "ta" 
      ? `நீங்கள் ஒரு நிபுணத்துவம் வாய்ந்த தாவர பராமரிப்பு மற்றும் வேளாண்மை ஆலோசகர். தாவர நோய்கள், சிகிச்சை, வளர்ப்பு முறைகள், மண் பராமரிப்பு, உரம், பூச்சி கட்டுப்பாடு மற்றும் பொதுவான தாவர பராமரிப்பு பற்றிய கேள்விகளுக்கு தமிழில் பதிலளிக்கவும். உங்கள் பதில்கள் நடைமுறை, அறிவியல் அடிப்படையிலான மற்றும் விவசாயிகள் மற்றும் தோட்டக்காரர்களுக்கு பயனுள்ளதாக இருக்க வேண்டும். 

**மார்க்டவுன் வடிவமைப்பு வழிகாட்டுதல்கள்:**
- முக்கிய தலைப்புகளுக்கு # அல்லது ## பயன்படுத்தவும்
- முக்கியமான சொற்களை **bold** ஆக்கவும்
- பட்டியல்களுக்கு - அல்லது 1. பயன்படுத்தவும்
- பத்திகளுக்கு இடையே வெற்று வரிகள் விடவும்`
      : `You are an expert plant care and agricultural advisor. Respond to questions about plant diseases, treatments, growing methods, soil care, fertilizers, pest control, and general plant care. Your responses should be practical, science-based, and helpful for farmers and gardeners.

**Markdown Formatting Guidelines:**
- Use # or ## for main headings and subheadings
- Make important terms and titles **bold**
- Use bullet points (-) or numbered lists (1.) for steps and tips
- Leave blank lines between paragraphs for better spacing
- Use **bold text** for key concepts, plant names, and important instructions
- Structure your response with clear sections and proper spacing
- Make titles and section headers stand out with bold formatting`;

    const prompt = `${systemPrompt}\n\nUser question: ${message}\n\nPlease provide a comprehensive, well-formatted response using proper markdown with clear headings, bold text for important terms, and good spacing between sections:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from Gemini API');
    }

    console.log('✅ Gemini response generated successfully');
    return text;

  } catch (error) {
    console.error("💥 Gemini API error:", error);
    
    // Provide helpful fallback responses based on common plant care topics
    const fallbackResponses = {
      en: `## 🌱 Plant Care Assistant

I'm currently experiencing some technical difficulties with the AI service, but I'm here to help with your plant care questions!

**Common Plant Care Topics I Can Help With:**
- **Plant Disease Identification** - Describe symptoms and I'll suggest treatments
- **Watering & Nutrition** - Proper watering schedules and fertilizer recommendations  
- **Pest Control** - Natural and chemical pest management solutions
- **Soil Health** - pH testing, soil amendments, and organic matter
- **Growing Tips** - Planting, pruning, and seasonal care advice

**Please try asking your question again, or contact our support team if the issue persists.**

*Tip: Be specific about your plant type, symptoms, and growing conditions for the best advice!*`,
      
      ta: `## 🌱 தாவர பராமரிப்பு உதவியாளர்

தற்போது AI சேவையில் சில தொழில்நுட்ப சிக்கல்கள் உள்ளன, ஆனால் உங்கள் தாவர பராமரிப்பு கேள்விகளுக்கு நான் உதவ இங்கே இருக்கிறேன்!

**நான் உதவக்கூடிய பொதுவான தாவர பராமரிப்பு தலைப்புகள்:**
- **தாவர நோய் கண்டறிதல்** - அறிகுறிகளை விவரிக்கவும், நான் சிகிச்சைகளை பரிந்துரைப்பேன்
- **நீர்ப்பாசனம் & ஊட்டச்சத்து** - சரியான நீர்ப்பாசன அட்டவணைகள் மற்றும் உர பரிந்துரைகள்
- **பூச்சி கட்டுப்பாடு** - இயற்கை மற்றும் இரசாயன பூச்சி மேலாண்மை தீர்வுகள்
- **மண் ஆரோக்கியம் ** - pH சோதனை, மண் திருத்தங்கள், மற்றும் கரிம பொருட்கள்
- **வளர்ப்பு குறிப்புகள்** - நடவு, கத்தரிப்பு, மற்றும் பருவகால பராமரிப்பு ஆலோசனை

**தயவுசெய்து உங்கள் கேள்வியை மீண்டும் கேட்கவும், அல்லது சிக்கல் தொடர்ந்தால் எங்கள் ஆதரவு குழுவை தொடர்பு கொள்ளவும்.**

*குறிப்பு: சிறந்த ஆலோசனைக்காக உங்கள் தாவர வகை, அறிகுறிகள் மற்றும் வளரும் நிலைமைகளைப் பற்றி குறிப்பிட்டுக் கூறவும்!*`
    };

    return fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.en;
  }
}

