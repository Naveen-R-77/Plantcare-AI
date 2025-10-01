"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/lib/language-context"

export function DebugPanel() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { token, user } = useAuth()
  const { language } = useLanguage()

  const testCropAdvisory = async () => {
    setIsLoading(true)
    try {
      console.log('🧪 Testing Crop Advisory API...')
      
      const testData = {
        ph: 6.5,
        nitrogen: 120,
        depth: 20,
        phosphorus: 30,
        potassium: 25,
        organicMatter: 3.2,
        moisture: 65,
        location: 'Chennai, India',
        weather: {
          temperature: 28,
          humidity: 70,
          rainfall: 10,
          windSpeed: 15,
          uvIndex: 6,
          forecast: 'Partly cloudy'
        },
        season: 'current',
        language: language
      }

      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      
      setTestResults(prev => ({
        ...prev,
        advisory: {
          status: response.status,
          success: response.ok,
          data: result,
          timestamp: new Date().toISOString()
        }
      }))

      console.log('✅ Crop Advisory Test Result:', result)
    } catch (error) {
      console.error('❌ Crop Advisory Test Failed:', error)
      setTestResults(prev => ({
        ...prev,
        advisory: {
          status: 'error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const testChatbot = async () => {
    setIsLoading(true)
    try {
      console.log('🧪 Testing Chatbot API...')
      
      if (!token) {
        throw new Error('No authentication token available')
      }

      const testMessage = 'Hello, can you help me with tomato plant care?'
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: testMessage,
          messageType: 'text',
          language: language
        }),
      })

      const result = await response.json()
      
      setTestResults(prev => ({
        ...prev,
        chat: {
          status: response.status,
          success: response.ok,
          data: result,
          timestamp: new Date().toISOString()
        }
      }))

      console.log('✅ Chatbot Test Result:', result)
    } catch (error) {
      console.error('❌ Chatbot Test Failed:', error)
      setTestResults(prev => ({
        ...prev,
        chat: {
          status: 'error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const testEnvironment = () => {
    const envCheck = {
      hasGeminiKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'Unknown (client-side)',
      hasWeatherKey: !!process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'Unknown (client-side)',
      hasJwtSecret: 'Unknown (server-side)',
      hasMongoUri: 'Unknown (server-side)',
      userAuthenticated: !!token,
      currentLanguage: language,
      userInfo: user ? { id: user.id, name: user.name, email: user.email } : null
    }

    setTestResults(prev => ({
      ...prev,
      environment: {
        ...envCheck,
        timestamp: new Date().toISOString()
      }
    }))

    console.log('🔍 Environment Check:', envCheck)
  }

  const runAllTests = async () => {
    testEnvironment()
    await testCropAdvisory()
    await testChatbot()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          🔧 Debug Panel
          <div className="flex gap-2">
            <Button onClick={runAllTests} disabled={isLoading} size="sm">
              Run All Tests
            </Button>
            <Button onClick={testEnvironment} variant="outline" size="sm">
              Check Environment
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">API Tests</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tests" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Crop Advisory Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testCropAdvisory} disabled={isLoading} className="w-full">
                    Test Advisory API
                  </Button>
                  {testResults.advisory && (
                    <div className="mt-2">
                      <Badge variant={testResults.advisory.success ? "default" : "destructive"}>
                        {testResults.advisory.success ? "✅ Success" : "❌ Failed"}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chatbot Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testChatbot} disabled={isLoading || !token} className="w-full">
                    Test Chat API
                  </Button>
                  {!token && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Please log in to test chatbot
                    </p>
                  )}
                  {testResults.chat && (
                    <div className="mt-2">
                      <Badge variant={testResults.chat.success ? "default" : "destructive"}>
                        {testResults.chat.success ? "✅ Success" : "❌ Failed"}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            {testResults.environment && (
              <div className="space-y-2">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span>User Authenticated:</span>
                    <Badge variant={testResults.environment.userAuthenticated ? "default" : "secondary"}>
                      {testResults.environment.userAuthenticated ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Language:</span>
                    <Badge variant="outline">{testResults.environment.currentLanguage}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Gemini API Key:</span>
                    <Badge variant="secondary">{testResults.environment.hasGeminiKey}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Weather API Key:</span>
                    <Badge variant="secondary">{testResults.environment.hasWeatherKey}</Badge>
                  </div>
                </div>
                {testResults.environment.userInfo && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">User Info:</h4>
                    <pre className="text-sm">{JSON.stringify(testResults.environment.userInfo, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {Object.keys(testResults).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(testResults).map(([key, result]: [string, any]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle className="text-lg capitalize">{key} Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm bg-muted p-3 rounded-lg overflow-auto max-h-96">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No test results yet. Run some tests to see results here.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
