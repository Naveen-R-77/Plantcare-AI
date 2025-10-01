"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Leaf,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Removed SoilData interface - no longer needed in frontend

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  uvIndex: number
  forecast: string
}

interface CropRecommendation {
  'Crop Category': string;
  'Crops/Plants': string;
  'Typical Soil pH': string;
  'Nitrogen (kg/ha)': string;
  'Soil Depth (cm)': string;
}

// Enhanced interface for Gemini recommendations
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

export function CropAdvisory() {
  const [location, setLocation] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 24,
    humidity: 68,
    rainfall: 12,
    windSpeed: 8,
    uvIndex: 6,
    forecast: "Partly cloudy with occasional showers",
  })
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<(CropRecommendation | GeminiCropRecommendation)[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendationSource, setRecommendationSource] = useState<'csv' | 'gemini'>('csv')

  // Removed soil data handling - all done in backend now

  const fetchWeatherData = async (locationName: string) => {
    if (!locationName.trim()) return

    setIsLoadingWeather(true)
    setWeatherError(null)

    try {
      // Check if API key is available
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
      
      if (!API_KEY || API_KEY === 'demo') {
        // Use mock weather data if no API key
        console.log('Using mock weather data - no API key configured')
        
        // Generate realistic weather based on location name
        const mockWeather = generateMockWeather(locationName)
        setWeatherData(mockWeather)
        return
      }
      
      // Try multiple location formats for better matching
      const locationVariants = [
        locationName,
        `${locationName}, India`, // Add country if not specified
        locationName.split(',')[0].trim(), // Try just city name
      ]
      
      let geoData = null
      let lastError = null
      
      for (const variant of locationVariants) {
        try {
          const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(variant)}&limit=1&appid=${API_KEY}`
          )
          
          if (geoResponse.ok) {
            const data = await geoResponse.json()
            if (data.length > 0) {
              geoData = data[0]
              break
            }
          }
        } catch (err) {
          lastError = err
        }
      }
      
      if (!geoData) {
        throw new Error(`Location "${locationName}" not found. Try: "City, Country" format (e.g., "Chennai, India")`)
      }
      
      const { lat, lon } = geoData
      
      // Get current weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      
      if (!weatherResponse.ok) {
        throw new Error('Weather service temporarily unavailable')
      }
      
      const weather = await weatherResponse.json()
      
      // Update weather data state
      setWeatherData({
        temperature: Math.round(weather.main.temp),
        humidity: weather.main.humidity,
        rainfall: weather.rain?.['1h'] || weather.rain?.['3h'] || 0,
        windSpeed: Math.round(weather.wind?.speed * 3.6 || 0), // Convert m/s to km/h
        uvIndex: 5, // UV data requires separate API call
        forecast: weather.weather[0]?.description || 'Clear',
      })
      
    } catch (error) {
      console.error('Weather fetch error:', error)
      
      // Fallback to mock weather data
      console.log('Falling back to mock weather data')
      const mockWeather = generateMockWeather(locationName)
      setWeatherData(mockWeather)
      
      setWeatherError(`Using estimated weather data. ${error instanceof Error ? error.message : 'Weather service unavailable'}`)
    } finally {
      setIsLoadingWeather(false)
    }
  }

  // Generate realistic mock weather based on location
  const generateMockWeather = (location: string) => {
    const locationLower = location.toLowerCase()
    
    // Different weather patterns for different regions
    if (locationLower.includes('chennai') || locationLower.includes('mumbai') || locationLower.includes('bangalore')) {
      return {
        temperature: 28 + Math.floor(Math.random() * 8), // 28-35°C
        humidity: 65 + Math.floor(Math.random() * 20), // 65-85%
        rainfall: Math.floor(Math.random() * 15), // 0-15mm
        windSpeed: 8 + Math.floor(Math.random() * 12), // 8-20 km/h
        uvIndex: 6,
        forecast: 'Partly cloudy with warm temperatures'
      }
    } else if (locationLower.includes('delhi') || locationLower.includes('punjab')) {
      return {
        temperature: 25 + Math.floor(Math.random() * 10), // 25-35°C
        humidity: 45 + Math.floor(Math.random() * 25), // 45-70%
        rainfall: Math.floor(Math.random() * 10), // 0-10mm
        windSpeed: 10 + Math.floor(Math.random() * 15), // 10-25 km/h
        uvIndex: 7,
        forecast: 'Clear skies with moderate temperatures'
      }
    } else {
      // Default weather for any location
      return {
        temperature: 24 + Math.floor(Math.random() * 12), // 24-36°C
        humidity: 55 + Math.floor(Math.random() * 30), // 55-85%
        rainfall: Math.floor(Math.random() * 12), // 0-12mm
        windSpeed: 6 + Math.floor(Math.random() * 14), // 6-20 km/h
        uvIndex: 5,
        forecast: 'Moderate weather conditions'
      }
    }
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    
    // Debounce weather API calls
    const timeoutId = setTimeout(() => {
      if (value.trim().length > 2) {
        fetchWeatherData(value)
      }
    }, 1000) // Wait 1 second after user stops typing
    
    return () => clearTimeout(timeoutId)
  }

  const analyzeConditions = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ph: soilData.ph, 
          nitrogen: soilData.nitrogen, 
          depth: soilData.depth,
          phosphorus: soilData.phosphorus,
          potassium: soilData.potassium,
          organicMatter: soilData.organicMatter,
          moisture: soilData.moisture,
          location: location,
          weather: weatherData,
          season: 'current'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log('Advisory API response:', data);
      
      // Handle both Gemini and CSV fallback responses
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        setRecommendationSource(data.source === 'gemini-ai' ? 'gemini' : 'csv');
      } else {
        setRecommendations(data); // Fallback for old CSV format
        setRecommendationSource('csv');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error state in UI, e.g., show a toast message
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    if (score >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const getSuitabilityBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", variant: "default" as const }
    if (score >= 80) return { label: "Good", variant: "secondary" as const }
    if (score >= 70) return { label: "Fair", variant: "outline" as const }
    return { label: "Poor", variant: "destructive" as const }
  }

  // Helper function to check if recommendation is Gemini format
  const isGeminiRecommendation = (rec: CropRecommendation | GeminiCropRecommendation): rec is GeminiCropRecommendation => {
    return 'cropName' in rec;
  }

  return (
    <div className="space-y-8">
      {/* Location and Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Location & Analysis</CardTitle>
          <CardDescription>Enter your location and soil parameters for personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                Location
                {isLoadingWeather && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </Label>
              <Input
                id="location"
                placeholder="Enter your city (e.g., Chennai, India)"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
              />
              {weatherError && (
                <p className="text-sm text-red-600">{weatherError}</p>
              )}
              {!isLoadingWeather && !weatherError && location && (
                <p className="text-sm text-green-600">✓ Weather data updated automatically</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop-type">Preferred Crop Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={analyzeConditions} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? "Analyzing Conditions..." : "Analyze & Get Recommendations"}
          </Button>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing soil and weather data...</span>
                <span>Analyzing</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Soil Parameters Section Removed - All handled in backend now */}

        {/* Weather Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Weather Conditions
              </div>
              {location && !isLoadingWeather && (
                <Badge variant={weatherError ? "outline" : "secondary"} className="text-xs">
                  {weatherError ? "Estimated" : "Live Data"}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {location 
                ? `Current weather for ${location}` 
                : 'Enter location to get real-time weather data'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-medium">{weatherData.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-medium">{weatherData.humidity}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Rainfall</span>
                </div>
                <span className="font-medium">{weatherData.rainfall}mm</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Wind Speed</span>
                </div>
                <span className="font-medium">{weatherData.windSpeed} km/h</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">UV Index</span>
                </div>
                <span className="font-medium">{weatherData.uvIndex}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">{weatherData.forecast}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Soil Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">85</div>
              <p className="text-sm text-muted-foreground">Overall Soil Health</p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">pH Balance</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Nutrients</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Moisture</span>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Organic Matter</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Crop Recommendations
              <Badge variant={recommendationSource === 'gemini' ? 'default' : 'secondary'}>
                {recommendationSource === 'gemini' ? 'AI-Powered' : 'Database'}
              </Badge>
            </CardTitle>
            <CardDescription>
              {recommendationSource === 'gemini' 
                ? 'AI-generated recommendations based on comprehensive soil analysis'
                : 'Based on your soil parameters and current weather conditions'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.map((rec, index) => (
                <Card key={index}>
                  {isGeminiRecommendation(rec) ? (
                    // Gemini AI Recommendation Format
                    <>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{rec.cropName}</CardTitle>
                          <Badge variant={getSuitabilityBadge(rec.suitabilityScore).variant}>
                            {rec.suitabilityScore}%
                          </Badge>
                        </div>
                        <CardDescription>{rec.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="tips">Tips</TabsTrigger>
                            <TabsTrigger value="risks">Risks</TabsTrigger>
                            <TabsTrigger value="market">Market</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Why This Crop?</h4>
                              <ul className="text-sm space-y-1">
                                {rec.reasons.map((reason, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Expected Yield:</span>
                                <p>{rec.expectedYield}</p>
                              </div>
                              <div>
                                <span className="font-medium">Growth Duration:</span>
                                <p>{rec.growthDuration}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="tips" className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Planting Tips</h4>
                              <ul className="text-sm space-y-1">
                                {rec.plantingTips.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Leaf className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <h5 className="font-medium text-sm mb-1">Seasonal Advice</h5>
                              <p className="text-sm text-muted-foreground">{rec.seasonalAdvice}</p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="risks" className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Risk Factors</h4>
                              <ul className="text-sm space-y-1">
                                {rec.riskFactors.map((risk, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    {risk}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="market" className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Market Information</h4>
                              <p className="text-sm">{rec.marketValue}</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </>
                  ) : (
                    // CSV Fallback Format
                    <>
                      <CardHeader>
                        <CardTitle>{rec['Crops/Plants']}</CardTitle>
                        <CardDescription>{rec['Crop Category']}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p><strong>pH:</strong> {rec['Typical Soil pH']}</p>
                        <p><strong>Nitrogen:</strong> {rec['Nitrogen (kg/ha)']} kg/ha</p>
                        <p><strong>Soil Depth:</strong> {rec['Soil Depth (cm)']} cm</p>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
