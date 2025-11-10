// ATOMS - Text Input Component

"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border bg-background px-3 py-2",
        "text-sm ring-offset-background",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all",
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...props}
    />
  )
})

TextInput.displayName = "TextInput"
