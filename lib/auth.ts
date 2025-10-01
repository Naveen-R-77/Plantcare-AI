"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  preferredLanguage: "en" | "ta"
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  })

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const user = localStorage.getItem("auth_user")

    if (token && user) {
      setAuthState({
        user: JSON.parse(user),
        token,
        loading: false,
      })
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("auth_user", JSON.stringify(data.user))
        setAuthState({
          user: data.user,
          token: data.token,
          loading: false,
        })
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const register = async (userData: {
    email: string
    password: string
    name: string
    phone?: string
    location?: string
    preferredLanguage?: "en" | "ta"
  }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    setAuthState({
      user: null,
      token: null,
      loading: false,
    })
  }

  return {
    ...authState,
    login,
    register,
    logout,
  }
}
