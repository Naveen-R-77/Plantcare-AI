import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage, context } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Text and target language are required" }, { status: 400 })
    }

    const translatedText = await translateWithGemini(text, targetLanguage, context)

    return NextResponse.json({
      originalText: text,
      translatedText,
      targetLanguage,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}

async function translateWithGemini(text: string, targetLanguage: string, context?: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const languageNames = {
      en: "English",
      hi: "Hindi (हिंदी)",
      ta: "Tamil (தமிழ்)",
      te: "Telugu (తెలుగు)",
      kn: "Kannada (ಕನ್ನಡ)",
      ml: "Malayalam (മലയാളം)",
      gu: "Gujarati (ગુજરાતી)",
      mr: "Marathi (मराठी)",
      bn: "Bengali (বাংলা)",
      pa: "Punjabi (ਪੰਜਾਬੀ)"
    };

    const targetLangName = languageNames[targetLanguage as keyof typeof languageNames] || targetLanguage;

    const prompt = `You are a professional translator specializing in agricultural and plant care applications. 

TASK: Translate the following text to ${targetLangName}.

CONTEXT: This is from a plant disease detection and agricultural advisory application. ${context ? `Specific context: ${context}` : ''}

CRITICAL FORMATTING RULES:
1. Return ONLY the translated text, no quotes, no explanations, no extra text
2. Do not add "Translation:" or any prefix/suffix
3. Keep the output clean and direct
4. Maintain the original meaning and tone
5. Use appropriate agricultural and botanical terminology
6. Make it natural and user-friendly for farmers and gardeners
7. For UI elements (buttons, labels), translate them appropriately
8. Ensure proper grammar and natural flow in the target language

TEXT TO TRANSLATE:
"${text}"

Provide only the direct translation:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text();

    return translatedText.trim() || text; // Fallback to original if translation fails

  } catch (error) {
    console.error("Gemini translation error:", error);
    return text; // Fallback to original text
  }
}
