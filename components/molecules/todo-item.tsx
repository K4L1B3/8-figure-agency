// MOLECULES - Todo Item Pattern
// Combines atoms (Checkbox, IconButton, Text) into a functional todo item

"use client"

import type React from "react"

import { useState } from "react"
import { Checkbox } from "@/components/atoms/checkbox"
import { IconButton } from "@/components/atoms/icon-button"
import { TextInput } from "@/components/atoms/text-input"
import { Trash2, Edit2, Check, X, AlignLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Todo {
  id: string
  text: string
  description?: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string, newDescription?: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDescription, setEditDescription] = useState(todo.description || "")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
    setEditDescription(todo.description || "")
  }

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editDescription.trim())
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditText(todo.text)
    setEditDescription(todo.description || "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  const handleGenerateDescription = async () => {
    if (!editText.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editText }),
      })

      if (response.ok) {
        const data = await response.json()
        setEditDescription(data.description)
      }
    } catch (error) {
      console.error("Error generating description:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isEditing) {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 p-4 rounded-lg",
          "border border-primary bg-card",
          "transition-all duration-200",
        )}
      >
        <TextInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Task title..."
          autoFocus
        />
        <div className="relative">
          <div className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
            <AlignLeft className="h-4 w-4" />
          </div>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a description (optional)..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-md",
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
            disabled={isGenerating || !editText.trim()}
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
        <div className="flex items-center justify-end gap-1">
          <IconButton size="sm" onClick={handleSaveEdit} aria-label="Save edit">
            <Check className="h-4 w-4" />
          </IconButton>
          <IconButton size="sm" variant="danger" onClick={handleCancelEdit} aria-label="Cancel edit">
            <X className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group flex items-start justify-between gap-3 p-4 rounded-lg",
        "border border-border bg-card hover:bg-accent/50",
        "transition-all duration-200",
        todo.completed && "opacity-60",
      )}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} className="mt-1" />
        <div className="flex-1 min-w-0 space-y-1">
          <span
            className={cn(
              "text-base font-bold block transition-all",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.text}
          </span>
          {todo.description && (
            <div className="flex items-start gap-2">
              <AlignLeft className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className={cn("text-sm text-muted-foreground", todo.completed && "line-through")}>
                {todo.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton size="sm" onClick={handleStartEdit} aria-label="Edit todo">
          <Edit2 className="h-4 w-4" />
        </IconButton>
        <IconButton size="sm" variant="danger" onClick={() => onDelete(todo.id)} aria-label="Delete todo">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  )
}
