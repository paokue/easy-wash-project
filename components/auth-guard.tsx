"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Verified } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "customer" | "shop-manager" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole = "customer", redirectTo = "/auth/login" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate authentication check
    // In a real app, this would check tokens, cookies, or call an API
    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication - in production, replace with actual auth logic
        const mockUser = {
          isAuthenticated: true,
          role: "customer", // This would come from your auth system
        }

        setIsAuthenticated(mockUser.isAuthenticated)
        setUserRole(mockUser.role)

        if (!mockUser.isAuthenticated) {
          router.push(redirectTo)
          return
        }

        // Check role permissions
        if (requiredRole && mockUser.role !== requiredRole && mockUser.role !== "admin") {
          router.push("/unauthorized")
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        router.push(redirectTo)
      }
    }

    checkAuth()
  }, [requiredRole, redirectTo, router])

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 animate-pulse">
              <Verified className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null // Router will handle redirect
  }

  // Authenticated and authorized
  return <>{children}</>
}
