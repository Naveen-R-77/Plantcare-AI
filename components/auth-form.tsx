"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Mail, Lock, User, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { t, language } = useLanguage()
  const { login, register } = useAuth()
  const router = useRouter()

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await login(signInData.email, signInData.password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await register({
      ...signUpData,
      preferredLanguage: language,
    })

    if (result.success) {
      setError("")
      // Switch to sign in tab after successful registration
      const signInTab = document.querySelector('[value="signin"]') as HTMLElement
      signInTab?.click()
    } else {
      setError(result.error || "Registration failed")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{t.auth.welcome}</CardTitle>
        <CardDescription>{t.auth.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t.auth.signIn}</TabsTrigger>
            <TabsTrigger value="signup">{t.auth.signUp}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.auth.emailPlaceholder}
                    className="pl-10"
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    className="pl-10"
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t.auth.signingIn : t.auth.signIn}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.auth.fullName}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.auth.namePlaceholder}
                    className="pl-10"
                    required
                    value={signUpData.name}
                    onChange={(e) => setSignUpData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">{t.auth.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t.auth.emailPlaceholder}
                    className="pl-10"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.auth.phoneNumber}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.auth.phonePlaceholder}
                    className="pl-10"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t.auth.location || "Location"}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, State"
                    className="pl-10"
                    value={signUpData.location}
                    onChange={(e) => setSignUpData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{t.auth.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={t.auth.createPassword}
                    className="pl-10"
                    required
                    value={signUpData.password}
                    onChange={(e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t.auth.creatingAccount : t.auth.createAccount}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
