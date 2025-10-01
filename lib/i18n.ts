export type Language = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "gu" | "mr" | "bn" | "pa"

export interface Translations {
  // Home Page
  home: {
    title: string
    subtitle: string
    tagline: string
    heroTitle: string
    heroSubtitle: string
    heroDescription: string
    features: {
      detection: {
        title: string
        description: string
      }
      chat: {
        title: string
        description: string
      }
      advisory: {
        title: string
        description: string
      }
      treatment: {
        title: string
        description: string
      }
    }
    stats: {
      accuracy: string
      plants: string
      support: string
      accuracyLabel: string
      plantsLabel: string
      supportLabel: string
    }
    footer: {
      copyright: string
      poweredBy: string
      secure: string
    }
    badges: {
      secure: string
      aiPowered: string
      globalAccess: string
    }
  }

  // Navigation
  nav: {
    title: string
    subtitle: string
    detection: string
    chat: string
    advisory: string
    profile: string
    settings: string
    signOut: string
  }

  // Authentication
  auth: {
    welcome: string
    subtitle: string
    signIn: string
    signUp: string
    email: string
    password: string
    fullName: string
    phoneNumber: string
    emailPlaceholder: string
    passwordPlaceholder: string
    namePlaceholder: string
    phonePlaceholder: string
    createPassword: string
    signingIn: string
    creatingAccount: string
    createAccount: string
  }

  // Disease Detection
  detection: {
    title: string
    subtitle: string
    uploadTitle: string
    uploadDescription: string
    takePhoto: string
    uploadImage: string
    analyzePlant: string
    analyzing: string
    analysisProgress: string
    resultsTitle: string
    resultsDescription: string
    uploadToStart: string
    confidenceLevel: string
    treatmentRecommendation: string
    saveResult: string
    getMoreHelp: string
    severity: {
      high: string
      medium: string
      low: string
    }
  }

  // Chat
  chat: {
    title: string
    subtitle: string
    assistantTitle: string
    online: string
    placeholder: string
    listening: string
    aiThinking: string
    listeningForVoice: string
    welcomeMessage: string
  }

  // Advisory
  advisory: {
    title: string
    subtitle: string
    locationAnalysis: string
    locationDescription: string
    location: string
    locationPlaceholder: string
    cropType: string
    cropTypePlaceholder: string
    analyze: string
    analyzing: string
    processingData: string
    soilParameters: string
    weatherConditions: string
    soilHealthScore: string
    overallSoilHealth: string
    phBalance: string
    nutrients: string
    moisture: string
    organicMatter: string
    temperature: string
    humidity: string
    rainfall: string
    windSpeed: string
    uvIndex: string
    cropRecommendations: string
    recommendationsDescription: string
    suitability: string
    season: string
    expectedYield: string
    planting: string
    harvest: string
    requirements: string
    growingTips: string
    details: string
    tips: string
    cropTypes: {
      vegetables: string
      fruits: string
      grains: string
      herbs: string
    }
    suitabilityLevels: {
      excellent: string
      good: string
      fair: string
      poor: string
    }
  }

  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    delete: string
    edit: string
    close: string
    welcome: string
  }

  // Dashboard
  dashboard: {
    subtitle: string
    healthScore: string
    plantsAnalyzed: string
    improvement: string
    sectionTitle: string
    sectionDescription: string
  }

  // Contact
  contact: {
    title: string
    subtitle: string
    description: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      submit: string
      submitting: string
    }
    info: {
      title: string
      email: string
      phone: string
      address: string
      hours: string
    }
    support: {
      title: string
      technical: string
      agricultural: string
      feedback: string
    }
    success: string
    error: string
  }
}

export const translations: Partial<Record<Language, Translations>> = {
  en: {
    home: {
      title: "PlantCare AI",
      subtitle: "Smart Agriculture Solutions",
      tagline: "AI-Powered Plant Health",
      heroTitle: "Revolutionize Your Agriculture",
      heroSubtitle: "Harness the power of artificial intelligence to detect plant diseases instantly, get expert treatment recommendations, and optimize your crop yields with personalized agricultural insights.",
      heroDescription: "Advanced AI technology for modern farming solutions",
      features: {
        detection: {
          title: "Disease Detection",
          description: "Advanced AI analysis identifies plant diseases from leaf images with 95% accuracy"
        },
        chat: {
          title: "Expert AI Chatbot",
          description: "Get instant expert advice through our intelligent conversational AI assistant"
        },
        advisory: {
          title: "Smart Crop Advisory",
          description: "Personalized recommendations based on soil conditions and weather patterns"
        },
        treatment: {
          title: "Treatment Plans",
          description: "Comprehensive treatment protocols with monitoring and prevention strategies"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "Accuracy Rate",
        plantsLabel: "Plants Analyzed",
        supportLabel: "AI Support"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. Empowering sustainable agriculture.",
        poweredBy: "Powered by Advanced AI",
        secure: "Secure & Private"
      },
      badges: {
        secure: "Secure & Private",
        aiPowered: "AI-Powered",
        globalAccess: "Global Access"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "Plant Disease Detection",
      detection: "Detection",
      chat: "Chat",
      advisory: "Advisory",
      profile: "Profile",
      settings: "Settings",
      signOut: "Sign out",
    },
    auth: {
      welcome: "Welcome to PlantCare AI",
      subtitle: "Sign in to access AI-powered plant disease detection",
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      emailPlaceholder: "farmer@example.com",
      passwordPlaceholder: "Enter your password",
      namePlaceholder: "John Farmer",
      phonePlaceholder: "+1 (555) 123-4567",
      createPassword: "Create a strong password",
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
      createAccount: "Create Account",
    },
    detection: {
      title: "Plant Disease Detection",
      subtitle: "Upload or capture plant leaf images for AI-powered disease analysis",
      uploadTitle: "Upload Plant Image",
      uploadDescription: "Take a photo or upload an image of the plant leaf for disease analysis",
      takePhoto: "Take Photo",
      uploadImage: "Upload Image",
      analyzePlant: "Analyze Plant",
      analyzing: "Analyzing...",
      analysisProgress: "AI Analysis in progress...",
      resultsTitle: "Analysis Results",
      resultsDescription: "AI-powered disease detection and treatment recommendations",
      uploadToStart: "Upload an image to get started",
      confidenceLevel: "Confidence Level",
      treatmentRecommendation: "Treatment Recommendation",
      saveResult: "Save Result",
      getMoreHelp: "Get More Help",
      severity: {
        high: "HIGH",
        medium: "MEDIUM",
        low: "LOW",
      },
    },
    chat: {
      title: "Plant Care Assistant",
      subtitle: "Get expert advice from our AI-powered plant care specialist",
      assistantTitle: "Plant Care Assistant",
      online: "Online",
      placeholder: "Ask about plant care, diseases, or treatments...",
      listening: "Listening...",
      aiThinking: "AI is thinking...",
      listeningForVoice: "Listening for voice input...",
      welcomeMessage:
        "Hello! I'm your AI plant care assistant. I can help you with plant diseases, treatment recommendations, growing tips, and general plant care advice. How can I help you today?",
    },
    advisory: {
      title: "Crop Advisory System",
      subtitle: "Get personalized crop recommendations based on your soil parameters and local weather conditions",
      locationAnalysis: "Location & Analysis",
      locationDescription: "Enter your location and soil parameters for personalized recommendations",
      location: "Location",
      locationPlaceholder: "Enter your city or coordinates",
      cropType: "Preferred Crop Type",
      cropTypePlaceholder: "Select crop category",
      analyze: "Analyze & Get Recommendations",
      analyzing: "Analyzing Conditions...",
      processingData: "Processing soil and weather data...",
      soilParameters: "Soil Parameters",
      weatherConditions: "Weather Conditions",
      soilHealthScore: "Soil Health Score",
      overallSoilHealth: "Overall Soil Health",
      phBalance: "pH Balance",
      nutrients: "Nutrients",
      moisture: "Moisture",
      organicMatter: "Organic Matter",
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      windSpeed: "Wind Speed",
      uvIndex: "UV Index",
      cropRecommendations: "Crop Recommendations",
      recommendationsDescription: "Based on your soil parameters and current weather conditions",
      suitability: "Suitability",
      season: "Season",
      expectedYield: "Expected Yield",
      planting: "Planting",
      harvest: "Harvest",
      requirements: "Requirements",
      growingTips: "Growing Tips",
      details: "Details",
      tips: "Tips",
      cropTypes: {
        vegetables: "Vegetables",
        fruits: "Fruits",
        grains: "Grains",
        herbs: "Herbs",
      },
      suitabilityLevels: {
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
        poor: "Poor",
      },
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      welcome: "Welcome back",
    },
    dashboard: {
      subtitle: "Ready to analyze your plants and optimize your agricultural practices",
      healthScore: "Health Score",
      plantsAnalyzed: "Plants Analyzed",
      improvement: "Improvement",
      sectionTitle: "Plant Disease Detection",
      sectionDescription: "Upload or capture plant leaf images for AI-powered disease analysis with treatment recommendations",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get Expert Agricultural Support",
      description: "Have questions about plant diseases, need technical support, or want to provide feedback? Our team of agricultural experts is here to help you succeed.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        submitting: "Sending...",
      },
      info: {
        title: "Contact Information",
        email: "plantcareai78@gmail.com",
        phone: "+1 (555) 123-4567",
        address: "123 Agriculture Tech Park, Farm City, FC 12345",
        hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      },
      support: {
        title: "Support Categories",
        technical: "Technical Support - App issues, camera problems, AI analysis errors",
        agricultural: "Agricultural Advice - Plant diseases, treatment recommendations, farming practices",
        feedback: "Feedback & Suggestions - Feature requests, improvements, general feedback",
      },
      success: "Message sent successfully! We'll get back to you within 24 hours.",
      error: "Failed to send message. Please try again or contact us directly.",
    },
  },
  ta: {
    home: {
      title: "PlantCare AI",
      subtitle: "ஸ்மார்ட் விவசாய தீர்வுகள்",
      tagline: "AI-இயங்கும் தாவர ஆரோக்கியம்",
      heroTitle: "உங்கள் விவசாயத்தை புரட்சிப்படுத்துங்கள்",
      heroSubtitle: "தாவர நோய்களை உடனடியாக கண்டறிய, நிபுணர் சிகிச்சை பரிந்துரைகளைப் பெற, மற்றும் தனிப்பயனாக்கப்பட்ட விவசாய நுண்ணறிவுகளுடன் உங்கள் பயிர் விளைச்சலை மேம்படுத்த செயற்கை நுண்ணறிவின் சக்தியைப் பயன்படுத்துங்கள்.",
      heroDescription: "நவீன விவசாய தீர்வுகளுக்கான மேம்பட்ட AI தொழில்நுட்பம்",
      features: {
        detection: {
          title: "நோய் கண்டறிதல்",
          description: "மேம்பட்ட AI பகுப்பாய்வு இலை படங்களிலிருந்து தாவர நோய்களை 95% துல்லியத்துடன் கண்டறிகிறது"
        },
        chat: {
          title: "நிபுணர் AI சாட்பாட்",
          description: "எங்கள் அறிவார்ந்த உரையாடல் AI உதவியாளர் மூலம் உடனடி நிபுணர் ஆலோசனை பெறுங்கள்"
        },
        advisory: {
          title: "ஸ்மார்ட் பயிர் ஆலோசனை",
          description: "மண் நிலைமைகள் மற்றும் வானிலை முறைகளின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்"
        },
        treatment: {
          title: "சிகிச்சை திட்டங்கள்",
          description: "கண்காணிப்பு மற்றும் தடுப்பு உத்திகளுடன் விரிவான சிகிச்சை நெறிமுறைகள்"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "துல்லிய விகிதம்",
        plantsLabel: "பகுப்பாய்வு செய்யப்பட்ட தாவரங்கள்",
        supportLabel: "AI ஆதரவு"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. நிலையான விவசாயத்தை மேம்படுத்துதல்.",
        poweredBy: "மேம்பட்ட AI ஆல் இயக்கப்படுகிறது",
        secure: "பாதுகாப்பான மற்றும் தனிப்பட்ட"
      },
      badges: {
        secure: "பாதுகாப்பான மற்றும் தனிப்பட்ட",
        aiPowered: "AI-இயங்கும்",
        globalAccess: "உலகளாவிய அணுகல்"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "தாவர நோய் கண்டறிதல்",
      detection: "கண்டறிதல்",
      chat: "அரட்டை",
      advisory: "ஆலோசனை",
      profile: "சுயவிவரம்",
      settings: "அமைப்புகள்",
      signOut: "வெளியேறு",
    },
    auth: {
      welcome: "PlantCare AI க்கு வரவேற்கிறோம்",
      subtitle: "AI-இயங்கும் தாவர நோய் கண்டறிதலை அணுக உள்நுழையவும்",
      signIn: "உள்நுழைய",
      signUp: "பதிவு செய்ய",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      fullName: "முழு பெயர்",
      phoneNumber: "தொலைபேசி எண்",
      emailPlaceholder: "விவசாயி@example.com",
      passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
      namePlaceholder: "ராம் விவசாயி",
      phonePlaceholder: "+91 98765 43210",
      createPassword: "வலுவான கடவுச்சொல்லை உருவாக்கவும்",
      signingIn: "உள்நுழைகிறது...",
      creatingAccount: "கணக்கை உருவாக்குகிறது...",
      createAccount: "கணக்கை உருவாக்கவும்",
    },
    detection: {
      title: "தாவர நோய் கண்டறிதல்",
      subtitle: "AI-இயங்கும் நோய் பகுப்பாய்வுக்காக தாவர இலை படங்களை பதிவேற்றவும் அல்லது எடுக்கவும்",
      uploadTitle: "தாவர படத்தை பதிவேற்றவும்",
      uploadDescription: "நோய் பகுப்பாய்வுக்காக தாவர இலையின் புகைப்படம் எடுக்கவும் அல்லது படத்தை பதிவேற்றவும்",
      takePhoto: "புகைப்படம் எடுக்கவும்",
      uploadImage: "படத்தை பதிவேற்றவும்",
      analyzePlant: "தாவரத்தை பகுப்பாய்வு செய்யவும்",
      analyzing: "பகுப்பாய்வு செய்கிறது...",
      analysisProgress: "AI பகுப்பாய்வு நடைபெறுகிறது...",
      resultsTitle: "பகுப்பாய்வு முடிவுகள்",
      resultsDescription: "AI-இயங்கும் நோய் கண்டறிதல் மற்றும் சிகிச்சை பரிந்துரைகள்",
      uploadToStart: "தொடங்க ஒரு படத்தை பதிவேற்றவும்",
      confidenceLevel: "நம்பிக்கை நிலை",
      treatmentRecommendation: "சிகிச்சை பரிந்துரை",
      saveResult: "முடிவை சேமிக்கவும்",
      getMoreHelp: "மேலும் உதவி பெறவும்",
      severity: {
        high: "அதிக",
        medium: "நடுத்தர",
        low: "குறைவு",
      },
    },
    chat: {
      title: "தாவர பராமரிப்பு உதவியாளர்",
      subtitle: "எங்கள் AI-இயங்கும் தாவர பராமரிப்பு நிபுணரிடமிருந்து நிபுணர் ஆலோசனை பெறுங்கள்",
      assistantTitle: "தாவர பராமரிப்பு உதவியாளர்",
      online: "ஆன்லைன்",
      placeholder: "தாவர பராமரிப்பு, நோய்கள் அல்லது சிகிச்சைகள் பற்றி கேளுங்கள்...",
      listening: "கேட்கிறது...",
      aiThinking: "AI சிந்திக்கிறது...",
      listeningForVoice: "குரல் உள்ளீட்டிற்காக கேட்கிறது...",
      welcomeMessage:
        "வணக்கம்! நான் உங்கள் AI தாவர பராமரிப்பு உதவியாளர். தாவர நோய்கள், சிகிச்சை பரிந்துரைகள், வளர்ப்பு குறிப்புகள் மற்றும் பொதுவான தாவர பராமரிப்பு ஆலோசனைகளில் நான் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    },
    advisory: {
      title: "பயிர் ஆலோசனை அமைப்பு",
      subtitle: "உங்கள் மண் அளவுருக்கள் மற்றும் உள்ளூர் வானிலை நிலைமைகளின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்",
      locationAnalysis: "இடம் மற்றும் பகுப்பாய்வு",
      locationDescription: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகளுக்காக உங்கள் இடம் மற்றும் மண் அளவுருக்களை உள்ளிடவும்",
      location: "இடம்",
      locationPlaceholder: "உங்கள் நகரம் அல்லது ஆயத்தொலைவுகளை உள்ளிடவும்",
      cropType: "விருப்பமான பயிர் வகை",
      cropTypePlaceholder: "பயிர் வகையைத் தேர்ந்தெடுக்கவும்",
      analyze: "பகுப்பாய்வு செய்து பரிந்துரைகளைப் பெறுங்கள்",
      analyzing: "நிலைமைகளை பகுப்பாய்வு செய்கிறது...",
      processingData: "மண் மற்றும் வானிலை தரவை செயலாக்குகிறது...",
      soilParameters: "மண் அளவுருக்கள்",
      weatherConditions: "வானிலை நிலைமைகள்",
      soilHealthScore: "மண் ஆரோக்கிய மதிப்பெண்",
      overallSoilHealth: "ஒட்டுமொத்த மண் ஆரோக்கியம்",
      phBalance: "pH சமநிலை",
      nutrients: "ஊட்டச்சத்துக்கள்",
      moisture: "ஈரப்பதம்",
      organicMatter: "கரிமப் பொருள்",
      temperature: "வெப்பநிலை",
      humidity: "ஈரப்பதம்",
      rainfall: "மழைப்பொழிவு",
      windSpeed: "காற்றின் வேகம்",
      uvIndex: "UV குறியீடு",
      cropRecommendations: "பயிர் பரிந்துரைகள்",
      recommendationsDescription: "உங்கள் மண் அளவுருக்கள் மற்றும் தற்போதைய வானிலை நிலைமைகளின் அடிப்படையில்",
      suitability: "பொருத்தம்",
      season: "பருவம்",
      expectedYield: "எதிர்பார்க்கப்படும் விளைச்சல்",
      planting: "நடவு",
      harvest: "அறுவடை",
      requirements: "தேவைகள்",
      growingTips: "வளர்ப்பு குறிப்புகள்",
      details: "விவரங்கள்",
      tips: "குறிப்புகள்",
      cropTypes: {
        vegetables: "காய்கறிகள்",
        fruits: "பழங்கள்",
        grains: "தானியங்கள்",
        herbs: "மூலிகைகள்",
      },
      suitabilityLevels: {
        excellent: "சிறந்த",
        good: "நல்ல",
        fair: "நியாயமான",
        poor: "மோசமான",
      },
    },
    common: {
      loading: "ஏற்றுகிறது...",
      error: "பிழை",
      success: "வெற்றி",
      cancel: "ரத்து செய்",
      save: "சேமி",
      delete: "நீக்கு",
      edit: "திருத்து",
      close: "மூடு",
      welcome: "மீண்டும் வரவேற்கிறோம்",
    },
    dashboard: {
      subtitle: "உங்கள் தாவரங்களை பகுப்பாய்வு செய்து உங்கள் விவசாய நடைமுறைகளை மேம்படுத்த தயாராக உள்ளீர்கள்",
      healthScore: "ஆரோக்கிய மதிப்பெண்",
      plantsAnalyzed: "பகுப்பாய்வு செய்யப்பட்ட தாவரங்கள்",
      improvement: "முன்னேற்றம்",
      sectionTitle: "தாவர நோய் கண்டறிதல்",
      sectionDescription: "AI-இயங்கும் நோய் பகுப்பாய்வு மற்றும் சிகிச்சை பரிந்துரைகளுக்காக தாவர இலை படங்களை பதிவேற்றவும் அல்லது படம் எடுக்கவும்",
    },
    contact: {
      title: "எங்களை தொடர்பு கொள்ளுங்கள்",
      subtitle: "நிபுணர் விவசாய ஆதரவு பெறுங்கள்",
      description: "தாவர நோய்கள் பற்றி கேள்விகள் உள்ளதா, தொழில்நுட்ப ஆதரவு தேவையா, அல்லது கருத்துக்களை வழங்க விரும்புகிறீர்களா? எங்கள் விவசாய நிபுணர்கள் குழு உங்கள் வெற்றிக்கு உதவ இங்கே உள்ளது.",
      form: {
        name: "முழு பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        subject: "விषயம்",
        message: "உங்கள் செய்தி",
        submit: "செய்தி அனுப்பு",
        submitting: "அனுப்புகிறது...",
      },
      info: {
        title: "தொடர்பு தகவல்",
        email: "plantcareai78@gmail.com",
        phone: "+91 (555) 123-4567",
        address: "123 விவசாய தொழில்நுட்ப பூங்கா, பண்ணை நகர், FC 12345",
        hours: "திங்கள் - வெள்ளி: காலை 9:00 - மாலை 6:00",
      },
      support: {
        title: "ஆதரவு வகைகள்",
        technical: "தொழில்நுட்ப ஆதரவு - பயன்பாட்டு சிக்கல்கள், கேமரா பிரச்சினைகள், AI பகுப்பாய்வு பிழைகள்",
        agricultural: "விவசாய ஆலோசனை - தாவர நோய்கள், சிகிச்சை பரிந்துரைகள், விவசாய நடைமுறைகள்",
        feedback: "கருத்துக்கள் & பரிந்துரைகள் - அம்ச கோரிக்கைகள், மேம்பாடுகள், பொதுவான கருத்துக்கள்",
      },
      success: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நாங்கள் 24 மணி நேரத்திற்குள் உங்களை தொடர்பு கொள்வோம்.",
      error: "செய்தி அனுப்ப முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக எங்களை தொடர்பு கொள்ளவும்.",
    },
  },
  hi: {
    home: {
      title: "PlantCare AI",
      subtitle: "स्मार्ट कृषि समाधान",
      tagline: "AI-संचालित पौधे का स्वास्थ्य",
      heroTitle: "अपनी कृषि में क्रांति लाएं",
      heroSubtitle: "पौधों की बीमारियों को तुरंत पहचानने, विशेषज्ञ उपचार की सिफारिशें प्राप्त करने, और व्यक्तिगत कृषि अंतर्दृष्टि के साथ अपनी फसल की पैदावार को अनुकूलित करने के लिए कृत्रिम बुद्धिमत्ता की शक्ति का उपयोग करें।",
      heroDescription: "आधुनिक कृषि समाधानों के लिए उन्नत AI तकनीक",
      features: {
        detection: {
          title: "बीमारी की पहचान",
          description: "उन्नत AI विश्लेषण पत्ती की छवियों से पौधों की बीमारियों को 95% सटीकता के साथ पहचानता है"
        },
        chat: {
          title: "विशेषज्ञ AI चैटबॉट",
          description: "हमारे बुद्धिमान संवादी AI सहायक के माध्यम से तत्काल विशेषज्ञ सलाह प्राप्त करें"
        },
        advisory: {
          title: "स्मार्ट फसल सलाहकार",
          description: "मिट्टी की स्थिति और मौसम के पैटर्न के आधार पर व्यक्तिगत सिफारिशें"
        },
        treatment: {
          title: "उपचार योजनाएं",
          description: "निगरानी और रोकथाम रणनीतियों के साथ व्यापक उपचार प्रोटोकॉल"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "सटीकता दर",
        plantsLabel: "विश्लेषित पौधे",
        supportLabel: "AI सहायता"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. टिकाऊ कृषि को सशक्त बनाना।",
        poweredBy: "उन्नत AI द्वारा संचालित",
        secure: "सुरक्षित और निजी"
      },
      badges: {
        secure: "सुरक्षित और निजी",
        aiPowered: "AI-संचालित",
        globalAccess: "वैश्विक पहुंच"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "पौधों की बीमारी की पहचान",
      detection: "पहचान",
      chat: "चैट",
      advisory: "सलाह",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स",
      signOut: "साइन आउट",
    },
    auth: {
      welcome: "PlantCare AI में आपका स्वागत है",
      subtitle: "AI-संचालित पौधों की बीमारी की पहचान के लिए साइन इन करें",
      signIn: "साइन इन",
      signUp: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      fullName: "पूरा नाम",
      phoneNumber: "फोन नंबर",
      emailPlaceholder: "किसान@example.com",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      namePlaceholder: "राम किसान",
      phonePlaceholder: "+91 98765 43210",
      createPassword: "एक मजबूत पासवर्ड बनाएं",
      signingIn: "साइन इन हो रहा है...",
      creatingAccount: "खाता बनाया जा रहा है...",
      createAccount: "खाता बनाएं",
    },
    detection: {
      title: "पौधों की बीमारी की पहचान",
      subtitle: "AI-संचालित बीमारी विश्लेषण के लिए पौधों की पत्ती की छवियां अपलोड करें या कैप्चर करें",
      uploadTitle: "पौधे की छवि अपलोड करें",
      uploadDescription: "बीमारी विश्लेषण के लिए पौधे की पत्ती की फोटो लें या छवि अपलोड करें",
      takePhoto: "फोटो लें",
      uploadImage: "छवि अपलोड करें",
      analyzePlant: "पौधे का विश्लेषण करें",
      analyzing: "विश्लेषण हो रहा है...",
      analysisProgress: "AI विश्लेषण प्रगति में है...",
      resultsTitle: "विश्लेषण परिणाम",
      resultsDescription: "AI-संचालित बीमारी की पहचान और उपचार की सिफारिशें",
      uploadToStart: "शुरू करने के लिए एक छवि अपलोड करें",
      confidenceLevel: "विश्वास स्तर",
      treatmentRecommendation: "उपचार की सिफारिश",
      saveResult: "परिणाम सहेजें",
      getMoreHelp: "अधिक सहायता प्राप्त करें",
      severity: {
        high: "उच्च",
        medium: "मध्यम",
        low: "कम",
      },
    },
    chat: {
      title: "पौधे की देखभाल सहायक",
      subtitle: "हमारे AI-संचालित पौधे की देखभाल विशेषज्ञ से विशेषज्ञ सलाह प्राप्त करें",
      assistantTitle: "पौधे की देखभाल सहायक",
      online: "ऑनलाइन",
      placeholder: "पौधों की देखभाल, बीमारियों या उपचार के बारे में पूछें...",
      listening: "सुन रहा है...",
      aiThinking: "AI सोच रहा है...",
      listeningForVoice: "आवाज़ इनपुट के लिए सुन रहा है...",
      welcomeMessage:
        "नमस्ते! मैं आपका AI पौधे की देखभाल सहायक हूं। मैं पौधों की बीमारियों, उपचार की सिफारिशों, बढ़ने की युक्तियों और सामान्य पौधों की देखभाल की सलाह में आपकी मदद कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    },
    advisory: {
      title: "फसल सलाहकार प्रणाली",
      subtitle: "अपने मिट्टी के मापदंडों और स्थानीय मौसम की स्थिति के आधार पर व्यक्तिगत फसल की सिफारिशें प्राप्त करें",
      locationAnalysis: "स्थान और विश्लेषण",
      locationDescription: "व्यक्तिगत सिफारिशों के लिए अपना स्था�� और मिट्टी के मापदंड दर्ज करें",
      location: "स्थान",
      locationPlaceholder: "अपना शहर या निर्देशांक दर्ज करें",
      cropType: "पसंदीदा फसल प्रकार",
      cropTypePlaceholder: "फसल श्रेणी चुनें",
      analyze: "विश्लेषण करें और सिफारिशें प्राप्त करें",
      analyzing: "स्थितियों का विश्लेषण हो रहा है...",
      processingData: "मिट्टी और मौसम डेटा प्रोसेसिंग...",
      soilParameters: "मिट्टी के मापदंड",
      weatherConditions: "मौसम की स्थिति",
      soilHealthScore: "मिट्टी स्वास्थ्य स्कोर",
      overallSoilHealth: "समग्र मिट्टी स्वास्थ्य",
      phBalance: "pH संतुलन",
      nutrients: "पोषक तत्व",
      moisture: "नमी",
      organicMatter: "जैविक पदार्थ",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      rainfall: "वर्षा",
      windSpeed: "हवा की गति",
      uvIndex: "UV सूचकांक",
      cropRecommendations: "फसल की सिफारिशें",
      recommendationsDescription: "आपके मिट्टी के मापदंडों और वर्तमान मौसम की स्थिति के आधार पर",
      suitability: "उपयुक्तता",
      season: "मौसम",
      expectedYield: "अपेक्षित उपज",
      planting: "रोपण",
      harvest: "फसल",
      requirements: "आवश्यकताएं",
      growingTips: "बढ़ने की युक्तियां",
      details: "विवरण",
      tips: "युक्तियां",
      cropTypes: {
        vegetables: "सब्जियां",
        fruits: "फल",
        grains: "अनाज",
        herbs: "जड़ी-बूटियां",
      },
      suitabilityLevels: {
        excellent: "उत्कृष्ट",
        good: "अच्छा",
        fair: "ठीक",
        poor: "खराब",
      },
    },
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      cancel: "रद्द करें",
      save: "सहेजें",
      delete: "हटाएं",
      edit: "संपादित करें",
      close: "बंद करें",
      welcome: "वापस स्वागत है",
    },
    dashboard: {
      subtitle: "अपने पौधों का विश्लेषण करने और अपनी कृषि प्रथाओं को अनुकूलित करने के लिए तैयार",
      healthScore: "स्वास्थ्य स्कोर",
      plantsAnalyzed: "विश्लेषित पौधे",
      improvement: "सुधार",
      sectionTitle: "पौधे की बीमारी की पहचान",
      sectionDescription: "AI-संचालित रोग विश्लेषण और उपचार सिफारिशों के लिए पौधे की पत्ती की छवियां अपलोड या कैप्चर करें",
    },
    contact: {
      title: "संपर्क करें",
      subtitle: "विशेषज्ञ कृषि सहायता प्राप्त करें",
      description: "पौधों की बीमारियों के बारे में प्रश्न हैं, तकनीकी सहायता चाहिए, या फीडबैक देना चाहते हैं? हमारी कृषि विशेषज्ञों की टीम आपकी सफलता में मदद करने के लिए यहाँ है।",
      form: { name: "पूरा नाम", email: "ईमेल पता", subject: "विषय", message: "आपका संदेश", submit: "संदेश भेजें", submitting: "भेजा जा रहा है..." },
      info: { title: "संपर्क जानकारी", email: "support@plantcare.ai", phone: "+91 (555) 123-4567", address: "123 कृषि तकनीक पार्क, फार्म सिटी, FC 12345", hours: "सोमवार - शुक्रवार: सुबह 9:00 - शाम 6:00" },
      support: { title: "सहायता श्रेणियां", technical: "तकनीकी सहायता - ऐप की समस्याएं, कैमरा की समस्याएं, AI विश्लेषण त्रुटियां", agricultural: "कृषि सलाह - पौधों की बीमारियां, उपचार सिफारिशें, खेती की प्रथाएं", feedback: "फीडबैक और सुझाव - फीचर अनुरोध, सुधार, सामान्य फीडबैक" },
      success: "संदेश सफलतापूर्वक भेजा गया! हम 24 घंटे के भीतर आपसे संपर्क करेंगे।",
      error: "संदेश भेजने में विफल। कृपया पुनः प्रयास करें या सीधे हमसे संपर्क करें।"
    },
  },
  te: {
    home: {
      title: "PlantCare AI",
      subtitle: "స్మార్ట్ వ్యవసాయ పరిష్కారాలు",
      tagline: "AI-శక్తితో మొక్కల ఆరోగ్యం",
      heroTitle: "మీ వ్యవసాయాన్ని విప్లవాత్మకంగా మార్చండి",
      heroSubtitle: "మొక్కల వ్యాధులను తక్షణమే గుర్తించడానికి, నిపుణుల చికిత్స సిఫార్సులను పొందడానికి, మరియు వ్యక్తిగతీకరించిన వ్యవసాయ అంతర్దృష్టులతో మీ పంట దిగుబడిని అనుకూలీకరించడానికి కృత్రిమ మేధస్సు యొక్క శక్తిని ఉపయోగించండి.",
      heroDescription: "ఆధునిక వ్యవసాయ పరిష్కారాల కోసం అధునాతన AI సాంకేతికత",
      features: {
        detection: {
          title: "వ్యాధి గుర్తింపు",
          description: "అధునాతన AI విశ్లేషణ ఆకు చిత్రాల నుండి మొక్కల వ్యాధులను 95% ఖచ్చితత్వంతో గుర్తిస్తుంది"
        },
        chat: {
          title: "నిపుణుడు AI చాట్‌బాట్",
          description: "మా తెలివైన సంభాషణ AI సహాయకుడి ద్వారా తక్షణ నిపుణుల సలహా పొందండి"
        },
        advisory: {
          title: "స్మార్ట్ పంట సలహా",
          description: "మట్టి పరిస్థితులు మరియు వాతావరణ నమూనాల ఆధారంగా వ్యక్తిగతీకరించిన సిఫార్సులు"
        },
        treatment: {
          title: "చికిత్స ప్రణాళికలు",
          description: "పర్యవేక్షణ మరియు నివారణ వ్యూహాలతో సమగ్ర చికిత్స ప్రోటోకాల్‌లు"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "ఖచ్చితత్వ రేటు",
        plantsLabel: "విశ్లేషించిన మొక్కలు",
        supportLabel: "AI మద్దతు"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. స్థిరమైన వ్యవసాయాన్ని శక్తివంతం చేయడం.",
        poweredBy: "అధునాతన AI ద్వారా శక్తివంతం",
        secure: "సురక్షితం మరియు ప్రైవేట్"
      },
      badges: {
        secure: "సురక్షితం మరియు ప్రైవేట్",
        aiPowered: "AI-శక్తితో",
        globalAccess: "ప్రపంచవ్యాప్త ప్రవేశం"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "మొక్కల వ్యాధి గుర్తింపు",
      detection: "గుర్తింపు",
      chat: "చాట్",
      advisory: "సలహా",
      profile: "ప్రొఫైల్",
      settings: "సెట్టింగ్‌లు",
      signOut: "సైన్ అవుట్",
    },
    auth: {
      welcome: "PlantCare AI కి స్వాగతం",
      subtitle: "AI-శక్తితో మొక్కల వ్యాధి గుర్తింపు కోసం సైన్ ఇన్ చేయండి",
      signIn: "సైన్ ఇన్",
      signUp: "సైన్ అప్",
      email: "ఇమెయిల్",
      password: "పాస్‌వర్డ్",
      fullName: "పూర్తి పేరు",
      phoneNumber: "ఫోన్ నంబర్",
      emailPlaceholder: "రైతు@example.com",
      passwordPlaceholder: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
      namePlaceholder: "రాము రైతు",
      phonePlaceholder: "+91 98765 43210",
      createPassword: "బలమైన పాస్‌వర్డ్ సృష్టించండి",
      signingIn: "సైన్ ఇన్ అవుతోంది...",
      creatingAccount: "ఖాతా సృష్టించబడుతోంది...",
      createAccount: "ఖాతా సృష్టించండి",
    },
    detection: {
      title: "మొక్కల వ్యాధి గుర్తింపు",
      subtitle: "AI-శక్తితో వ్యాధి విశ్లేషణ కోసం మొక్కల ఆకు చిత్రాలను అప్‌లోడ్ చేయండి లేదా క్యాప్చర్ చేయండి",
      uploadTitle: "మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి",
      uploadDescription: "వ్యాధి విశ్లేషణ కోసం మొక్క ఆకు యొక్క ఫోటో తీయండి లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి",
      takePhoto: "ఫోటో తీయండి",
      uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
      analyzePlant: "మొక్కను విశ్లేషించండి",
      analyzing: "విశ్లేషిస్తోంది...",
      analysisProgress: "AI విశ్లేషణ ప్రగతిలో ఉంది...",
      resultsTitle: "విశ్లేషణ ఫలితాలు",
      resultsDescription: "AI-శక్తితో వ్యాధి గుర్తింపు మరియు చికిత్స సిఫార్సులు",
      uploadToStart: "ప్రారంభించడానికి చిత్రాన్ని అప్‌లోడ్ చేయండి",
      confidenceLevel: "విశ్వాస స్థాయి",
      treatmentRecommendation: "చికిత్స సిఫార్సు",
      saveResult: "ఫలితాన్ని సేవ్ చేయండి",
      getMoreHelp: "మరింత సహాయం పొందండి",
      severity: {
        high: "అధిక",
        medium: "మధ్యమ",
        low: "తక్కువ",
      },
    },
    chat: {
      title: "మొక్కల సంరక్షణ సహాయకుడు",
      subtitle: "మా AI-శక్తితో మొక్కల సంరక్షణ నిపుణుడి నుండి నిపుణుల సలహా పొందండి",
      assistantTitle: "మొక్కల సంరక్షణ సహాయకుడు",
      online: "ఆన్‌లైన్",
      placeholder: "మొక్కల సంరక్షణ, వ్యాధులు లేదా చికిత్సల గురించి అడగండి...",
      listening: "వింటోంది...",
      aiThinking: "AI ఆలోచిస్తోంది...",
      listeningForVoice: "వాయిస్ ఇన్‌పుట్ కోసం వింటోంది...",
      welcomeMessage: "నమస్కారం! నేను మీ AI మొక్కల సంరక్షణ సహాయకుడిని. మొక్కల వ్యాధులు, చికిత్స సిఫార్సులు, పెరుగుట చిట్కాలు మరియు సాధారణ మొక్కల సంరక్షణ సలహాలలో నేను మీకు సహాయం చేయగలను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    },
    advisory: {
      title: "పంట సలహా వ్యవస్థ",
      subtitle: "మీ మట్టి పారామీటర్లు మరియు స్థానిక వాతావరణ పరిస్థితుల ఆధారంగా వ్యక్తిగతీకరించిన పంట సిఫార్సులను పొందండి",
      locationAnalysis: "స్థానం మరియు విశ్లేషణ",
      locationDescription: "వ్యక్తిగతీకరించిన సిఫార్సుల కోసం మీ స్థానం మరియు మట్టి పారామీటర్లను నమోదు చేయండి",
      location: "స్థానం",
      locationPlaceholder: "మీ నగరం లేదా కోఆర్డినేట్‌లను నమోదు చేయండి",
      cropType: "ప్రాధాన్య పంట రకం",
      cropTypePlaceholder: "పంట వర్గాన్ని ఎంచుకోండి",
      analyze: "విశ్లేషించండి మరియు సిఫార్సులను పొందండి",
      analyzing: "పరిస్థితులను విశ్లేషిస్తోంది...",
      processingData: "మట్టి మరియు వాతావరణ డేటాను ప్రాసెసింగ్ చేస్తోంది...",
      soilParameters: "మట్టి పారామీటర్లు",
      weatherConditions: "వాతావరణ పరిస్థితులు",
      soilHealthScore: "మట్టి ఆరోగ్య స్కోర్",
      overallSoilHealth: "మొత్తం మట్టి ఆరోగ్యం",
      phBalance: "pH సమతుల్యత",
      nutrients: "పోషకాలు",
      moisture: "తేమ",
      organicMatter: "సేంద్రీయ పదార్థం",
      temperature: "ఉష్ణోగ్రత",
      humidity: "తేమ",
      rainfall: "వర్షపాతం",
      windSpeed: "గాలి వేగం",
      uvIndex: "UV సూచిక",
      cropRecommendations: "పంట సిఫార్సులు",
      recommendationsDescription: "మీ మట్టి పారామీటర్లు మరియు ప్రస్తుత వాతావరణ పరిస్థితుల ఆధారంగా",
      suitability: "అనుకూలత",
      season: "సీజన్",
      expectedYield: "ఆశించిన దిగుబడి",
      planting: "నాటడం",
      harvest: "పంట",
      requirements: "అవసరాలు",
      growingTips: "పెరుగుట చిట్కాలు",
      details: "వివరాలు",
      tips: "చిట్కాలు",
      cropTypes: {
        vegetables: "కూరగాయలు",
        fruits: "పండ్లు",
        grains: "ధాన్యాలు",
        herbs: "మూలికలు",
      },
      suitabilityLevels: {
        excellent: "అద్భుతమైన",
        good: "మంచి",
        fair: "సరైన",
        poor: "చెడు",
      },
    },
    common: {
      loading: "లోడ్ అవుతోంది...",
      error: "లోపం",
      success: "విజయం",
      cancel: "రద్దు చేయండి",
      save: "సేవ్ చేయండి",
      delete: "తొలగించండి",
      edit: "సవరించండి",
      close: "మూసివేయండి",
      welcome: "తిరిగి స్వాగతం",
    },
    dashboard: {
      subtitle: "మీ మొక్కలను విశ్లేషించడానికి మరియు మీ వ్యవసాయ పద్ధతులను అనుకూలీకరించడానికి సిద్ధంగా ఉన్నారు",
      healthScore: "ఆరోగ్య స్కోర్",
      plantsAnalyzed: "విశ్లేషించిన మొక్కలు",
      improvement: "మెరుగుదల",
      sectionTitle: "మొక్కల వ్యాధి గుర్తింపు",
      sectionDescription: "AI-శక్తితో వ్యాధి విశ్లేషణ మరియు చికిత్సా సిఫార్సుల కోసం మొక్కల ఆకుల చిత్రాలను అప్‌లోడ్ చేయండి లేదా క్యాప్చర్ చేయండి",
    },
  },
  kn: {
    home: {
      title: "PlantCare AI",
      subtitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಹಾರಗಳು",
      tagline: "AI-ಚಾಲಿತ ಸಸ್ಯ ಆರೋಗ್ಯ",
      heroTitle: "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಕ್ರಾಂತಿಕಾರಿಯಾಗಿ ಮಾರ್ಪಡಿಸಿ",
      heroSubtitle: "ಸಸ್ಯ ರೋಗಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಲು, ತಜ್ಞರ ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು, ಮತ್ತು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಕೃಷಿ ಒಳನೋಟಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆ ಇಳುವರಿಯನ್ನು ಅನುಕೂಲಗೊಳಿಸಲು ಕೃತ್ರಿಮ ಬುದ್ಧಿಮತ್ತೆಯ ಶಕ್ತಿಯನ್ನು ಬಳಸಿ.",
      heroDescription: "ಆಧುನಿಕ ಕೃಷಿ ಪರಿಹಾರಗಳಿಗಾಗಿ ಸುಧಾರಿತ AI ತಂತ್ರಜ್ಞಾನ",
      features: {
        detection: {
          title: "ರೋಗ ಪತ್ತೆ",
          description: "ಸುಧಾರಿತ AI ವಿಶ್ಲೇಷಣೆಯು ಎಲೆ ಚಿತ್ರಗಳಿಂದ ಸಸ್ಯ ರೋಗಗಳನ್ನು 95% ನಿಖರತೆಯೊಂದಿಗೆ ಗುರುತಿಸುತ್ತದೆ"
        },
        chat: {
          title: "ತಜ್ಞ AI ಚಾಟ್‌ಬಾಟ್",
          description: "ನಮ್ಮ ಬುದ್ಧಿವಂತ ಸಂವಾದಾತ್ಮಕ AI ಸಹಾಯಕನ ಮೂಲಕ ತಕ್ಷಣದ ತಜ್ಞರ ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ"
        },
        advisory: {
          title: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಸಲಹೆ",
          description: "ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಹವಾಮಾನ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಶಿಫಾರಸುಗಳು"
        },
        treatment: {
          title: "ಚಿಕಿತ್ಸೆ ಯೋಜನೆಗಳು",
          description: "ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ ತಂತ್ರಗಳೊಂದಿಗೆ ಸಮಗ್ರ ಚಿಕಿತ್ಸೆ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "ನಿಖರತೆ ದರ",
        plantsLabel: "ವಿಶ್ಲೇಷಿಸಿದ ಸಸ್ಯಗಳು",
        supportLabel: "AI ಬೆಂಬಲ"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. ಸುಸ್ಥಿರ ಕೃಷಿಯನ್ನು ಶಕ್ತಿಗೊಳಿಸುವುದು.",
        poweredBy: "ಸುಧಾರಿತ AI ನಿಂದ ಚಾಲಿತ",
        secure: "ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ"
      },
      badges: {
        secure: "ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ",
        aiPowered: "AI-ಚಾಲಿತ",
        globalAccess: "ಜಾಗತಿಕ ಪ್ರವೇಶ"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "ಸಸ್ಯ ರೋಗ ಪತ್ತೆ",
      detection: "ಪತ್ತೆ",
      chat: "ಚಾಟ್",
      advisory: "ಸಲಹೆ",
      profile: "ಪ್ರೊಫೈಲ್",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      signOut: "ಸೈನ್ ಔಟ್",
    },
    auth: {
      welcome: "PlantCare AI ಗೆ ಸ್ವಾಗತ",
      subtitle: "AI-ಚಾಲಿತ ಸಸ್ಯ ರೋಗ ಪತ್ತೆಗಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ",
      signIn: "ಸೈನ್ ಇನ್",
      signUp: "ಸೈನ್ ಅಪ್",
      email: "ಇಮೇಲ್",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
      emailPlaceholder: "ರೈತ@example.com",
      passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
      namePlaceholder: "ರಾಮ ರೈತ",
      phonePlaceholder: "+91 98765 43210",
      createPassword: "ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
      signingIn: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...",
      creatingAccount: "ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...",
      createAccount: "ಖಾತೆ ರಚಿಸಿ",
    },
    detection: {
      title: "ಸಸ್ಯ ರೋಗ ಪತ್ತೆ",
      subtitle: "AI-ಚಾಲಿತ ರೋಗ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಸಸ್ಯ ಎಲೆ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
      uploadTitle: "ಸಸ್ಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      uploadDescription: "ರೋಗ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಸಸ್ಯ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      takePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
      uploadImage: "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      analyzePlant: "ಸಸ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
      analyzing: "ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      analysisProgress: "AI ವಿಶ್ಲೇಷಣೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...",
      resultsTitle: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು",
      resultsDescription: "AI-ಚಾಲಿತ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳು",
      uploadToStart: "ಪ್ರಾರಂಭಿಸಲು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      confidenceLevel: "ವಿಶ್ವಾಸ ಮಟ್ಟ",
      treatmentRecommendation: "ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸು",
      saveResult: "ಫಲಿತಾಂಶವನ್ನು ಉಳಿಸಿ",
      getMoreHelp: "ಹೆಚ್ಚಿನ ಸಹಾಯ ಪಡೆಯಿರಿ",
      severity: {
        high: "ಹೆಚ್ಚು",
        medium: "ಮಧ್ಯಮ",
        low: "ಕಡಿಮೆ",
      },
    },
    chat: {
      title: "ಸಸ್ಯ ಆರೈಕೆ ಸಹಾಯಕ",
      subtitle: "ನಮ್ಮ AI-ಚಾಲಿತ ಸಸ್ಯ ಆರೈಕೆ ತಜ್ಞರಿಂದ ತಜ್ಞರ ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ",
      assistantTitle: "ಸಸ್ಯ ಆರೈಕೆ ಸಹಾಯಕ",
      online: "ಆನ್‌ಲೈನ್",
      placeholder: "ಸಸ್ಯ ಆರೈಕೆ, ರೋಗಗಳು ಅಥವಾ ಚಿಕಿತ್ಸೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
      listening: "ಕೇಳುತ್ತಿದೆ...",
      aiThinking: "AI ಯೋಚಿಸುತ್ತಿದೆ...",
      listeningForVoice: "ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ ಕೇಳುತ್ತಿದೆ...",
      welcomeMessage: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಸಸ್ಯ ಆರೈಕೆ ಸಹಾಯಕ. ಸಸ್ಯ ರೋಗಗಳು, ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳು, ಬೆಳೆಯುವ ಸಲಹೆಗಳು ಮತ್ತು ಸಾಮಾನ್ಯ ಸಸ್ಯ ಆರೈಕೆ ಸಲಹೆಗಳಲ್ಲಿ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?",
    },
    advisory: {
      title: "ಬೆಳೆ ಸಲಹಾ ವ್ಯವಸ್ಥೆ",
      subtitle: "ನಿಮ್ಮ ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
      locationAnalysis: "ಸ್ಥಳ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ",
      locationDescription: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ",
      location: "ಸ್ಥಳ",
      locationPlaceholder: "ನಿಮ್ಮ ನಗರ ಅಥವಾ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ",
      cropType: "ಆದ್ಯತೆಯ ಬೆಳೆ ಪ್ರಕಾರ",
      cropTypePlaceholder: "ಬೆಳೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      analyze: "ವಿಶ್ಲೇಷಿಸಿ ಮತ್ತು ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
      analyzing: "ಪರಿಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      processingData: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದೆ...",
      soilParameters: "ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳು",
      weatherConditions: "ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು",
      soilHealthScore: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      overallSoilHealth: "ಒಟ್ಟಾರೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
      phBalance: "pH ಸಮತೋಲನ",
      nutrients: "ಪೋಷಕಾಂಶಗಳು",
      moisture: "ತೇವಾಂಶ",
      organicMatter: "ಸಾವಯವ ಪದಾರ್ಥ",
      temperature: "ತಾಪಮಾನ",
      humidity: "ತೇವಾಂಶ",
      rainfall: "ಮಳೆ",
      windSpeed: "ಗಾಳಿಯ ವೇಗ",
      uvIndex: "UV ಸೂಚ್ಯಂಕ",
      cropRecommendations: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
      recommendationsDescription: "ನಿಮ್ಮ ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳು ಮತ್ತು ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ",
      suitability: "ಅನುಕೂಲತೆ",
      season: "ಋತು",
      expectedYield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
      planting: "ನೆಡುವಿಕೆ",
      harvest: "ಸುಗ್ಗಿ",
      requirements: "ಅವಶ್ಯಕತೆಗಳು",
      growingTips: "ಬೆಳೆಯುವ ಸಲಹೆಗಳು",
      details: "ವಿವರಗಳು",
      tips: "ಸಲಹೆಗಳು",
      cropTypes: {
        vegetables: "ತರಕಾರಿಗಳು",
        fruits: "ಹಣ್ಣುಗಳು",
        grains: "ಧಾನ್ಯಗಳು",
        herbs: "ಗಿಡಮೂಲಿಕೆಗಳು",
      },
      suitabilityLevels: {
        excellent: "ಅತ್ಯುತ್ತಮ",
        good: "ಒಳ್ಳೆಯದು",
        fair: "ಸರಿಯಾದ",
        poor: "ಕಳಪೆ",
      },
    },
    common: {
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      error: "ದೋಷ",
      success: "ಯಶಸ್ಸು",
      cancel: "ರದ್ದುಮಾಡಿ",
      save: "ಉಳಿಸಿ",
      delete: "ಅಳಿಸಿ",
      edit: "ಸಂಪಾದಿಸಿ",
      close: "ಮುಚ್ಚಿ",
      welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    },
    dashboard: {
      subtitle: "ನಿಮ್ಮ ಸಸ್ಯಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಮತ್ತು ನಿಮ್ಮ ಕೃಷಿ ಅಭ್ಯಾಸಗಳನ್ನು ಅನುಕೂಲಗೊಳಿಸಲು ಸಿದ್ಧ",
      healthScore: "ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      plantsAnalyzed: "ವಿಶ್ಲೇಷಿಸಿದ ಸಸ್ಯಗಳು",
      improvement: "ಸುಧಾರಣೆ",
      sectionTitle: "ಸಸ್ಯ ರೋಗ ಪತ್ತೆ",
      sectionDescription: "AI-ಚಾಲಿತ ರೋಗ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ಸಸ್ಯ ಎಲೆಯ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
    },
  },
  ml: {
    home: {
      title: "PlantCare AI",
      subtitle: "സ്മാർട്ട് കാർഷിക പരിഹാരങ്ങൾ",
      tagline: "AI-പവർഡ് പ്ലാന്റ് ഹെൽത്ത്",
      heroTitle: "നിങ്ങളുടെ കൃഷിയെ വിപ്ലവകരമാക്കുക",
      heroSubtitle: "സസ്യ രോഗങ്ങൾ തൽക്ഷണം കണ്ടെത്താനും, വിദഗ്ധ ചികിത്സാ ശുപാർശകൾ നേടാനും, വ്യക്തിഗതമാക്കിയ കാർഷിക ഉൾക്കാഴ്ചകൾ ഉപയോഗിച്ച് നിങ്ങളുടെ വിള വിളവ് ഒപ്റ്റിമൈസ് ചെയ്യാനും കൃത്രിമ ബുദ്ധിയുടെ ശക്തി ഉപയോഗിക്കുക.",
      heroDescription: "ആധുനിക കാർഷിക പരിഹാരങ്ങൾക്കായി നൂതന AI സാങ്കേതികവിദ്യ",
      features: {
        detection: {
          title: "രോഗ കണ്ടെത്തൽ",
          description: "നൂതന AI വിശകലനം ഇല ചിത്രങ്ങളിൽ നിന്ന് സസ്യ രോഗങ്ങൾ 95% കൃത്യതയോടെ തിരിച്ചറിയുന്നു"
        },
        chat: {
          title: "വിദഗ്ധ AI ചാറ്റ്ബോട്ട്",
          description: "ഞങ്ങളുടെ ബുദ്ധിമാനായ സംഭാഷണ AI അസിസ്റ്റന്റിലൂടെ തൽക്ഷണ വിദഗ്ധ ഉപദേശം നേടുക"
        },
        advisory: {
          title: "സ്മാർട്ട് വിള ഉപദേശം",
          description: "മണ്ണിന്റെ അവസ്ഥകളും കാലാവസ്ഥാ പാറ്റേണുകളും അടിസ്ഥാനമാക്കിയുള്ള വ്യക്തിഗതമാക്കിയ ശുപാർശകൾ"
        },
        treatment: {
          title: "ചികിത്സാ പദ്ധതികൾ",
          description: "നിരീക്ഷണവും പ്രതിരോധ തന്ത്രങ്ങളുമുള്ള സമഗ്ര ചികിത്സാ പ്രോട്ടോക്കോളുകൾ"
        }
      },
      stats: {
        accuracy: "95%",
        plants: "50K+",
        support: "24/7",
        accuracyLabel: "കൃത്യത നിരക്ക്",
        plantsLabel: "വിശകലനം ചെയ്ത സസ്യങ്ങൾ",
        supportLabel: "AI പിന്തുണ"
      },
      footer: {
        copyright: "© 2025 PlantCare AI. സുസ്ഥിര കൃഷിയെ ശാക്തീകരിക്കുന്നു.",
        poweredBy: "നൂതന AI യാൽ പവർഡ്",
        secure: "സുരക്ഷിതവും സ്വകാര്യവും"
      },
      badges: {
        secure: "സുരക്ഷിതവും സ്വകാര്യവും",
        aiPowered: "AI-പവർഡ്",
        globalAccess: "ആഗോള പ്രവേശനം"
      }
    },
    nav: {
      title: "PlantCare AI",
      subtitle: "സസ്യ രോഗ കണ്ടെത്തൽ",
      detection: "കണ്ടെത്തൽ",
      chat: "ചാറ്റ്",
      advisory: "ഉപദേശം",
      profile: "പ്രൊഫൈൽ",
      settings: "സെറ്റിംഗുകൾ",
      signOut: "സൈൻ ഔട്ട്",
    },
    auth: {
      welcome: "PlantCare AI യിലേക്ക് സ്വാഗതം",
      subtitle: "AI-പവർഡ് സസ്യ രോഗ കണ്ടെത്തലിനായി സൈൻ ഇൻ ചെയ്യുക",
      signIn: "സൈൻ ഇൻ",
      signUp: "സൈൻ അപ്പ്",
      email: "ഇമെയിൽ",
      password: "പാസ്‌വേഡ്",
      fullName: "പൂർണ്ണ നാമം",
      phoneNumber: "ഫോൺ നമ്പർ",
      emailPlaceholder: "കർഷകൻ@example.com",
      passwordPlaceholder: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
      namePlaceholder: "രാമൻ കർഷകൻ",
      phonePlaceholder: "+91 98765 43210",
      createPassword: "ശക്തമായ പാസ്‌വേഡ് സൃഷ്ടിക്കുക",
      signingIn: "സൈൻ ഇൻ ചെയ്യുന്നു...",
      creatingAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുന്നു...",
      createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    },
    detection: {
      title: "സസ്യ രോഗ കണ്ടെത്തൽ",
      subtitle: "AI-പവർഡ് രോഗ വിശകലനത്തിനായി സസ്യ ഇല ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ക്യാപ്‌ചർ ചെയ്യുക",
      uploadTitle: "സസ്യ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
      uploadDescription: "രോഗ വിശകലനത്തിനായി സസ്യ ഇലയുടെ ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
      takePhoto: "ഫോട്ടോ എടുക്കുക",
      uploadImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
      analyzePlant: "സസ്യം വിശകലനം ചെയ്യുക",
      analyzing: "വിശകലനം ചെയ്യുന്നു...",
      analysisProgress: "AI വിശകലനം പുരോഗതിയിൽ...",
      resultsTitle: "വിശകലന ഫലങ്ങൾ",
      resultsDescription: "AI-പവർഡ് രോഗ കണ്ടെത്തലും ചികിത്സാ ശുപാർശകളും",
      uploadToStart: "ആരംഭിക്കാൻ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
      confidenceLevel: "വിശ്വാസ നില",
      treatmentRecommendation: "ചികിത്സാ ശുപാർശ",
      saveResult: "ഫലം സേവ് ചെയ്യുക",
      getMoreHelp: "കൂടുതൽ സഹായം നേടുക",
      severity: {
        high: "ഉയർന്ന",
        medium: "ഇടത്തരം",
        low: "കുറഞ്ഞ",
      },
    },
    chat: {
      title: "സസ്യ പരിചരണ സഹായി",
      subtitle: "ഞങ്ങളുടെ AI-പവർഡ് സസ്യ പരിചരണ വിദഗ്ധനിൽ നിന്ന് വിദഗ്ധ ഉപദേശം നേടുക",
      assistantTitle: "സസ്യ പരിചരണ സഹായി",
      online: "ഓൺലൈൻ",
      placeholder: "സസ്യ പരിചരണം, രോഗങ്ങൾ അല്ലെങ്കിൽ ചികിത്സകളെക്കുറിച്ച് ചോദിക്കുക...",
      listening: "കേൾക്കുന്നു...",
      aiThinking: "AI ചിന്തിക്കുന്നു...",
      listeningForVoice: "വോയ്‌സ് ഇൻപുട്ടിനായി കേൾക്കുന്നു...",
      welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI സസ്യ പരിചരണ സഹായിയാണ്. സസ്യ രോഗങ്ങൾ, ചികിത്സാ ശുപാർശകൾ, വളർത്തൽ നുറുങ്ങുകൾ, സാധാരണ സസ്യ പരിചരണ ഉപദേശങ്ങൾ എന്നിവയിൽ എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയും. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
    },
    advisory: {
      title: "വിള ഉപദേശ സംവിധാനം",
      subtitle: "നിങ്ങളുടെ മണ്ണിന്റെ പാരാമീറ്ററുകളും പ്രാദേശിക കാലാവസ്ഥാ സാഹചര്യങ്ങളും അടിസ്ഥാനമാക്കി വ്യക്തിഗതമാക്കിയ വിള ശുപാർശകൾ നേടുക",
      locationAnalysis: "സ്ഥലവും വിശകലനവും",
      locationDescription: "വ്യക്തിഗതമാക്കിയ ശുപാർശകൾക്കായി നിങ്ങളുടെ സ്ഥലവും മണ്ണിന്റെ പാരാമീറ്ററുകളും നൽകുക",
      location: "സ്ഥലം",
      locationPlaceholder: "നിങ്ങളുടെ നഗരം അല്ലെങ്കിൽ കോർഡിനേറ്റുകൾ നൽകുക",
      cropType: "മുൻഗണനാ വിള തരം",
      cropTypePlaceholder: "വിള വിഭാഗം തിരഞ്ഞെടുക്കുക",
      analyze: "വിശകലനം ചെയ്ത് ശുപാർശകൾ നേടുക",
      analyzing: "സാഹചര്യങ്ങൾ വിശകലനം ചെയ്യുന്നു...",
      processingData: "മണ്ണും കാലാവസ്ഥാ ഡാറ്റയും പ്രോസസ്സിംഗ് ചെയ്യുന്നു...",
      soilParameters: "മണ്ണിന്റെ പാരാമീറ്ററുകൾ",
      weatherConditions: "കാലാവസ്ഥാ സാഹചര്യങ്ങൾ",
      soilHealthScore: "മണ്ണിന്റെ ആരോഗ്യ സ്കോർ",
      overallSoilHealth: "മൊത്തത്തിലുള്ള മണ്ണിന്റെ ആരോഗ്യം",
      phBalance: "pH സന്തുലനം",
      nutrients: "പോഷകങ്ങൾ",
      moisture: "ഈർപ്പം",
      organicMatter: "ജൈവ പദാർത്ഥം",
      temperature: "താപനില",
      humidity: "ഈർപ്പം",
      rainfall: "മഴ",
      windSpeed: "കാറ്റിന്റെ വേഗത",
      uvIndex: "UV സൂചിക",
      cropRecommendations: "വിള ശുപാർശകൾ",
      recommendationsDescription: "നിങ്ങളുടെ മണ്ണിന്റെ പാരാമീറ്ററുകളും നിലവിലെ കാലാവസ്ഥാ സാഹചര്യങ്ങളും അടിസ്ഥാനമാക്കി",
      suitability: "അനുയോജ്യത",
      season: "സീസൺ",
      expectedYield: "പ്രതീക്ഷിക്കുന്ന വിളവ്",
      planting: "നടൽ",
      harvest: "വിളവെടുപ്പ്",
      requirements: "ആവശ്യകതകൾ",
      growingTips: "വളർത്തൽ നുറുങ്ങുകൾ",
      details: "വിശദാംശങ്ങൾ",
      tips: "നുറുങ്ങുകൾ",
      cropTypes: {
        vegetables: "പച്ചക്കറികൾ",
        fruits: "പഴങ്ങൾ",
        grains: "ധാന്യങ്ങൾ",
        herbs: "ഔഷധസസ്യങ്ങൾ",
      },
      suitabilityLevels: {
        excellent: "മികച്ച",
        good: "നല്ല",
        fair: "ന്യായമായ",
        poor: "മോശം",
      },
    },
    common: {
      loading: "ലോഡ് ചെയ്യുന്നു...",
      error: "പിശക്",
      success: "വിജയം",
      cancel: "റദ്ദാക്കുക",
      save: "സേവ് ചെയ്യുക",
      delete: "ഇല്ലാതാക്കുക",
      edit: "എഡിറ്റ് ചെയ്യുക",
      close: "അടയ്ക്കുക",
      welcome: "വീണ്ടും സ്വാഗതം",
    },
    dashboard: {
      subtitle: "നിങ്ങളുടെ സസ്യങ്ങളെ വിശകലനം ചെയ്യാനും നിങ്ങളുടെ കാർഷിക രീതികൾ ഒപ്റ്റിമൈസ് ചെയ്യാനും തയ്യാറാണ്",
      healthScore: "ആരോഗ്യ സ്കോർ",
      plantsAnalyzed: "വിശകലനം ചെയ്ത സസ്യങ്ങൾ",
      improvement: "മെച്ചപ്പെടുത്തൽ",
      sectionTitle: "സസ്യ രോഗ കണ്ടെത്തൽ",
      sectionDescription: "AI-പവർഡ് രോഗ വിശകലനത്തിനും ചികിത്സാ ശുപാർശകൾക്കുമായി സസ്യ ഇല ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ക്യാപ്ചർ ചെയ്യുക",
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en!
}
