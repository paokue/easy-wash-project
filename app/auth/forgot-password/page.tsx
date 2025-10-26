"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { CheckCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSent(true)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card>
          {!emailSent ? (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Forgot Password</CardTitle>
                <CardDescription className="text-sm">We'll send you a link to reset your password</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="text-sm" required />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Reset Link
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="text-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent password reset instructions to your email address. Please check your inbox and follow the
                link to reset your password.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button asChild className="w-auto">
                  <Link href="/auth/login">Back to Sign In</Link>
                </Button>
                <Button variant="outline" className="w-auto text-sm bg-transparent" onClick={() => setEmailSent(false)}>
                  Resend Email
                </Button>
              </div>
            </CardContent>
          )}

          <div className="text-center mt-2">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

      </div>
    </div>
  )
}
