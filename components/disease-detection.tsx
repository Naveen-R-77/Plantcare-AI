"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, X, MapPin, Zap, Save, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { TranslatedText } from "./translated-text"
import { useLanguage } from "@/lib/language-context"

interface DetectionResult {
  disease: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  treatment: string
  description: string
  prevention: string
}

interface PredictiveAnalysis {
  riskLevel: "Low" | "Medium" | "High"
  spreadProbability: number
  environmentalFactors: string[]
  recommendations: string[]
}

export function DiseaseDetection() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [predictiveAnalysis, setPredictiveAnalysis] = useState<PredictiveAnalysis | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [location, setLocation] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isInitializingCamera, setIsInitializingCamera] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [cropAdvisory, setCropAdvisory] = useState<any>(null)
  const [isGettingAdvisory, setIsGettingAdvisory] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { token } = useAuth()

  // Check camera permissions on mount
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({ name: 'camera' as PermissionName })
          setCameraPermission(permission.state as 'granted' | 'denied' | 'prompt')
          
          // Listen for permission changes
          permission.onchange = () => {
            setCameraPermission(permission.state as 'granted' | 'denied' | 'prompt')
          }
        }
      } catch (error) {
        console.log('Permission API not supported')
        setCameraPermission('unknown')
      }
    }
    
    checkCameraPermission()
  }, [])

  // Geolocation effect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            )
            const data = await response.json()
            setLocation(`${data.city}, ${data.countryName}`)
          } catch (error) {
            console.log("Could not get location name")
          }
        },
        () => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type, file.size)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
        console.log('Image loaded successfully')
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
    }
  }

  const openCamera = async () => {
    setIsInitializingCamera(true)
    setCameraError(null)
    
    try {
      console.log('📷 Requesting camera access...')
      
      // Progressive constraint fallback for better device compatibility
      const constraints = [
        { video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } }, // Back camera preferred
        { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } }, // Front camera fallback
        { video: { width: { ideal: 640 }, height: { ideal: 480 } } }, // Lower resolution fallback
        { video: true } // Basic video
      ]
      
      let stream = null
      let lastError = null
      
      for (const constraint of constraints) {
        try {
          console.log('🔄 Trying constraint:', constraint)
          stream = await navigator.mediaDevices.getUserMedia(constraint)
          console.log('✅ Camera access granted with constraint:', constraint)
          break
        } catch (err) {
          console.log('⚠️ Constraint failed:', constraint, err)
          lastError = err
        }
      }
      
      if (!stream) {
        throw lastError || new Error('All camera constraints failed')
      }
      
      setStream(stream)
      setIsCameraOpen(true)
      
      // Use setTimeout to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream
          videoRef.current.play().then(() => {
            console.log('✅ Video playing successfully')
            setIsVideoPlaying(true)
          }).catch((playError) => {
            console.error('❌ Video play error:', playError)
            setCameraError('Failed to start video playback')
          })
        }
      }, 100)
      
    } catch (error) {
      console.error('❌ Camera error:', error)
      
      let errorMessage = 'Camera not available'
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera access denied. Please allow camera permissions and try again.'
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please connect a camera and try again.'
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera is being used by another application. Please close other apps and try again.'
        } else {
          errorMessage = `Camera error: ${error.message}`
        }
      }
      
      setCameraError(errorMessage)
    } finally {
      setIsInitializingCamera(false)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    
    if (!video || !canvas) {
      console.error('❌ Video or canvas element not available')
      alert('Camera not ready. Please try again.')
      return
    }
    
    // Check if video is playing and has dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error('❌ Video not ready - no dimensions')
      alert('Camera is still loading. Please wait a moment and try again.')
      return
    }
    
    try {
      console.log('📸 Capturing photo...')
      console.log('📐 Video dimensions:', video.videoWidth, 'x', video.videoHeight)
      
      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('Could not get canvas context')
      }
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8) // Add quality parameter
      console.log('✅ Photo captured, data length:', imageData.length)
      
      setSelectedImage(imageData)
      closeCamera()
    } catch (error) {
      console.error('❌ Error capturing photo:', error)
      alert('Failed to capture photo. Please try again.')
    }
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraOpen(false)
    setIsVideoPlaying(false)
  }

  const getCropAdvisory = async () => {
    if (!location.trim()) {
      alert('Please enter your location first')
      return
    }

    setIsGettingAdvisory(true)
    setCropAdvisory(null)

    try {
      console.log('🧪 Calling Gemini API for soil analysis...')
      
      const response = await fetch('/api/soil-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get soil analysis from Gemini API')
      }

      const data = await response.json()
      console.log('✅ Gemini API response received')
      setCropAdvisory(data.analysis)

    } catch (error) {
      console.error('❌ Soil analysis error:', error)
      alert('Failed to get soil analysis. Please check your Gemini API key in .env.local file.')
    } finally {
      setIsGettingAdvisory(false)
    }
  }


  const analyzeImage = async () => {
    if (!selectedImage) {
      alert('Please select or capture an image first')
      return
    }

    if (!token) {
      alert('Please log in to analyze images')
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)
    setPredictiveAnalysis(null)

    try {
      console.log('🔬 Starting image analysis...')
      console.log('📸 Image data length:', selectedImage?.length || 0)
      console.log('📍 Location:', location || 'Not provided')
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch("/api/ai-detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: selectedImage,
          location: location || 'Unknown',
          language: language,
        }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Analysis failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Analysis completed:', data)
      
      if (data.success && data.result) {
        setResult(data.result)
        setPredictiveAnalysis(data.predictiveAnalysis)
      } else {
        throw new Error('Invalid response format from analysis API')
      }
      
    } catch (error) {
      console.error('❌ Analysis error:', error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      if (errorMessage.includes('Gemini API key')) {
        alert('⚠️ Gemini API not configured. Using demo analysis.\n\nTo enable real AI analysis:\n1. Get a Gemini API key from https://makersuite.google.com/app/apikey\n2. Create .env.local file\n3. Add: GEMINI_API_KEY=your_key_here')
      } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
        alert('⚠️ API quota exceeded. Using demo analysis.')
      } else {
        console.log('🎲 Using demo analysis due to error:', errorMessage)
      }
      
      // Set mock result for demo purposes with language support
      const demoResults = {
        en: {
          disease: "Leaf Spot Disease (Demo)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "Apply copper-based fungicide spray every 7-10 days. Remove affected leaves and improve air circulation.",
          description: "Common fungal infection affecting leaf tissue. This is a demo result - configure Gemini API for real analysis.",
          prevention: "Ensure proper air circulation and avoid overhead watering. Practice crop rotation."
        },
        ta: {
          disease: "இலை புள்ளி நோய் (டெமோ)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "7-10 நாட்களுக்கு ஒருமுறை தாமிர அடிப்படையிலான பூஞ்சைக் கொல்லி தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை அகற்றி காற்று சுழற்சியை மேம்படுத்தவும்.",
          description: "இலை திசுக்களை பாதிக்கும் பொதுவான பூஞ்சை தொற்று. இது ஒரு டெமோ முடிவு - உண்மையான பகுப்பாய்வுக்கு Gemini API ஐ கட்டமைக்கவும்.",
          prevention: "சரியான காற்று சுழற்சியை உறுதிப்படுத்தவும் மற்றும் மேல்நோக்கி நீர்ப்பாசனத்தை தவிர்க்கவும். பயிர் சுழற்சியை கடைப்பிடிக்கவும்."
        },
        hi: {
          disease: "पत्ती धब्बा रोग (डेमो)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "हर 7-10 दिन में तांबा आधारित फफूंदनाशक का छिड़काव करें। प्रभावित पत्तियों को हटाएं और हवा का संचार बेहतर बनाएं।",
          description: "पत्ती के ऊतकों को प्रभावित करने वाला सामान्य फंगल संक्रमण। यह एक डेमो परिणाम है - वास्तविक विश्लेषण के लिए Gemini API कॉन्फ़िगर करें।",
          prevention: "उचित हवा संचार सुनिश्चित करें और ऊपरी सिंचाई से बचें। फसल चक्र का अभ्यास करें।"
        },
        te: {
          disease: "ఆకు మచ్చ వ్యాధి (డెమో)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "ప్రతి 7-10 రోజులకు రాగి ఆధారిత శిలీంధ్రనాశక స్ప్రే చేయండి. ప్రభావిత ఆకులను తొలగించి గాలి ప్రసరణను మెరుగుపరచండి.",
          description: "ఆకు కణజాలాలను ప్రభావితం చేసే సాధారణ శిలీంధ్ర సంక్రమణ. ఇది డెమో ఫలితం - నిజమైన విశ్లేషణ కోసం Gemini API ని కాన్ఫిగర్ చేయండి.",
          prevention: "సరైన గాలి ప్రసరణను నిర్ధారించండి మరియు పైనుండి నీరు పోయడం మానుకోండి. పంట మార్పిడిని అభ్యసించండి."
        },
        kn: {
          disease: "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ಡೆಮೊ)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "ಪ್ರತಿ 7-10 ದಿನಗಳಿಗೊಮ್ಮೆ ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ. ಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಗಾಳಿ ಪರಿಚಲನೆಯನ್ನು ಸುಧಾರಿಸಿ.",
          description: "ಎಲೆ ಅಂಗಾಂಶಗಳನ್ನು ಪ್ರಭಾವಿಸುವ ಸಾಮಾನ್ಯ ಶಿಲೀಂಧ್ರ ಸೋಂಕು. ಇದು ಡೆಮೊ ಫಲಿತಾಂಶ - ನಿಜವಾದ ವಿಶ್ಲೇಷಣೆಗಾಗಿ Gemini API ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.",
          prevention: "ಸರಿಯಾದ ಗಾಳಿ ಪರಿಚಲನೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ ಮತ್ತು ಮೇಲಿನಿಂದ ನೀರುಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ. ಬೆಳೆ ಸರದಿಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ."
        },
        ml: {
          disease: "ഇല പാട് രോഗം (ഡെമോ)",
          confidence: 85,
          severity: "Medium" as const,
          treatment: "ഓരോ 7-10 ദിവസത്തിലും ചെമ്പ് അടിസ്ഥാനമാക്കിയ കുമിൾനാശിനി സ്പ്രേ ചെയ്യുക. ബാധിത ഇലകൾ നീക്കം ചെയ്ത് വായു സഞ്ചാരം മെച്ചപ്പെടുത്തുക.",
          description: "ഇല കോശങ്ങളെ ബാധിക്കുന്ന സാധാരണ കുമിൾ അണുബാധ. ഇത് ഒരു ഡെമോ ഫലമാണ് - യഥാർത്ഥ വിശകലനത്തിനായി Gemini API കോൺഫിഗർ ചെയ്യുക.",
          prevention: "ശരിയായ വായു സഞ്ചാരം ഉറപ്പാക്കുകയും മുകളിൽ നിന്നുള്ള നനയ്ക്കൽ ഒഴിവാക്കുകയും ചെയ്യുക. വിള ഭ്രമണം പരിശീലിക്കുക."
        }
      };

      const demoResult = demoResults[language as keyof typeof demoResults] || demoResults.en;
      setResult(demoResult)
      
      setPredictiveAnalysis({
        riskLevel: "Medium",
        spreadProbability: 65,
        environmentalFactors: ["High humidity", "Poor air circulation", "Overhead watering"],
        recommendations: ["Improve ventilation", "Use drip irrigation", "Apply preventive fungicide"]
      })
    }

    setIsAnalyzing(false)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-yellow-50"
      case "low":
        return "bg-green-500 text-green-50"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden container mx-auto px-4">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <TranslatedText context="section-title">Plant Disease Detection</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText context="section-description">Upload or capture an image of your plant to detect diseases and get treatment recommendations</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-full overflow-hidden">
          <div className="space-y-2">
            <Label htmlFor="location">
              <TranslatedText context="form-label">Location</TranslatedText>
            </Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter your location (e.g., Chennai, India)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={getCropAdvisory}
                disabled={isGettingAdvisory || !location.trim()}
                variant="outline"
              >
                {isGettingAdvisory ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    <TranslatedText context="button-loading">Getting Recommendations...</TranslatedText>
                  </>
                ) : (
                  <TranslatedText context="button">🌾 Get Farming Recommendations</TranslatedText>
                )}
              </Button>
            </div>
          </div>

          {!selectedImage && !isCameraOpen ? (
            <div className="space-y-4">
              {cameraError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-sm text-red-700">{cameraError}</p>
                </div>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  onClick={openCamera}
                  disabled={isInitializingCamera}
                  className="h-24 flex-col gap-2"
                  size="lg"
                >
                  {isInitializingCamera ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      <TranslatedText context="button-loading">Initializing Camera...</TranslatedText>
                    </>
                  ) : (
                    <>
                      <Camera className="h-8 w-8" />
                      <TranslatedText context="button">Open Camera</TranslatedText>
                    </>
                  )}
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="h-24 flex-col gap-2" 
                  variant="outline"
                  size="lg"
                >
                  <Upload className="h-8 w-8" />
                  <TranslatedText context="button">Upload Photo</TranslatedText>
                </Button>
              </div>
              
              {/* Quick test button */}
              <div className="text-center">
                <Button 
                  onClick={async () => {
                    try {
                      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                      console.log('✅ Camera test successful:', stream.getVideoTracks()[0].getSettings())
                      stream.getTracks().forEach(track => track.stop())
                      alert('✅ Camera works! The issue might be with video display.')
                    } catch (error) {
                      console.error('❌ Camera test failed:', error)
                      alert(`❌ Camera test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
                    }
                  }}
                  variant="outline"
                  size="sm"
                >
                  🧪 Test Camera Access
                </Button>
              </div>
            </div>
          ) : isCameraOpen ? (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="plant-image-container bg-black border border-border">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded"
                  />
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-sm">Loading camera...</p>
                      </div>
                    </div>
                  )}
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={capturePhoto} 
                    disabled={!isVideoPlaying}
                    size="lg"
                    className={cn(
                      "transition-all duration-200",
                      isVideoPlaying ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                    )}
                  >
                    📸 {isVideoPlaying ? 'Take Photo' : 'Camera Loading...'}
                  </Button>
                  <Button onClick={closeCamera} size="lg" variant="outline">
                    ❌ Close Camera
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="plant-image-container border border-border">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected plant"
                  className="w-full h-full object-cover"
                />
                <Button onClick={clearImage} size="sm" variant="destructive" className="absolute top-2 right-2 z-10">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={analyzeImage} disabled={isAnalyzing} className="w-full" size="lg">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze Plant
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Analysis in progress...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground text-center">
                    Analyzing with multiple AI models for accurate results...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Hidden inputs */}
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden" 
          />
          
          <input 
            ref={cameraInputRef} 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handleImageUpload} 
            className="hidden"
            style={{ display: 'none' }}
            autoComplete="off"
            name="camera-capture"
          />
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Detection Results
              </div>
              <Badge className={getSeverityColor(result.severity)}>
                {result.severity} Risk
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg">{result.disease}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Confidence: {result.confidence}%
                </p>
                <p className="text-sm">{result.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Treatment</h4>
                <p className="text-sm">{result.treatment}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Prevention</h4>
              <p className="text-sm">{result.prevention}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Farming Recommendations */}
      {cropAdvisory && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌾 Farming Recommendations for {location}
            </CardTitle>
            <CardDescription>
              Personalized crop and farming advice based on your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  🎯 AI-Generated Farming Plan for {location}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                <strong>Smart recommendations:</strong> Crop selection, fertilizers, timing, and economics tailored for your area
              </p>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-white p-4 rounded-lg border">
                {cropAdvisory}
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>📋 Implementation:</strong> Follow these recommendations step-by-step for best results in {location}. 
                Consult local agricultural experts for field-specific adjustments.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
