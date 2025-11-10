// MOLECULES - Add Todo Form Pattern
// Combines TextInput and Button atoms into a form pattern

"use client"

import type React from "react"

import { useState } from "react"
import { TextInput } from "@/components/atoms/text-input"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddTodoFormProps {
  onAdd: (text: string, description?: string) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value.trim(), description.trim())
      setValue("")
      setDescription("")
    }
  }

  const handleGenerateDescription = async () => {
    if (!value.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: value }),
      })

      if (response.ok) {
        const data = await response.json()
        setDescription(data.description)
      }
    } catch (error) {
      console.error("Error generating description:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a new todo..." />
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)..."
          className={cn(
            "w-full px-4 py-2 rounded-md",
            "bg-background border border-border",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "resize-none min-h-[60px]",
          )}
          rows={2}
          disabled={isGenerating}
        />
        <button
          type="button"
          onClick={handleGenerateDescription}
          disabled={isGenerating || !value.trim()}
          className={cn(
            "absolute right-2 bottom-2 px-3 py-1.5 rounded-md",
            "bg-primary/10 hover:bg-primary/20 text-primary",
            "text-xs font-medium flex items-center gap-1.5",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <Sparkles className={cn("h-3 w-3", isGenerating && "animate-spin")} />
          {isGenerating ? "Gerando..." : "Gerar com IA"}
        </button>
      </div>
      <Button type="submit" size="lg" className="w-full">
        <Plus className="h-5 w-5 mr-2" />
        Add Todo
      </Button>
    </form>
  )
}
