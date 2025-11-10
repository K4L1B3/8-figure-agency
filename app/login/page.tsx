"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextInput } from "@/components/atoms/text-input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setError("Please, enter your email.")
      return
    }

    if (!emailRegex.test(email)) {
      setError("Please, enter a valid email address.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Login failed to process.")
      }

      const user = await response.json()

      // Store user data in localStorage
      localStorage.setItem("userId", user.id)
      localStorage.setItem("userEmail", user.email)

      // Redirect to todo page
      router.push("/")
    } catch (err) {
      setError("Error logging in. Please try again.")
      console.error("[v0] Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground">Log in to access your tasks.</p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                placeholder="seu@email.com"
                className="w-full"
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "loading..." : "Access"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Your data is securely stored in the database.
        </p>
      </div>
    </main>
  )
}
