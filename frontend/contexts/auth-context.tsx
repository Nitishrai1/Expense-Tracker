"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user && !!token

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
          const { token: storedToken, userId, name, email } = JSON.parse(userInfo)
          if (storedToken && userId) {
            setToken(storedToken)
            setUser({ id: userId, name: name || "", email: email || "" })
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        localStorage.removeItem("userInfo")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3002/api/auth/login", {
        email,
        password,
      })

      const data = response.data
      const userInfo = {
        token: data.token,
        userId: data.user.id,
        name: data.user.name,
        email: data.user.email,
      }

      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      setToken(data.token)
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message)
      throw new Error(error.response?.data?.msg || "Login failed")
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3002/api/auth/signup", {
        name,
        email,
        password,
      })

      const data = response.data
      const userInfo = {
        token: data.token,
        userId: data.user.id,
        name: data.user.name,
        email: data.user.email,
      }

      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      setToken(data.token)
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message)
      throw new Error(error.response?.data?.msg || "Signup failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("userInfo")
    setUser(null)
    setToken(null)
    router.push("/auth/signin")
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
