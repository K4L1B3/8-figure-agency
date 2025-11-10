// ATOMS - Icon Button Component

"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger" | "success"
  size?: "sm" | "md" | "lg"
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
      danger: "hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400",
      success: "hover:bg-green-50 dark:hover:bg-green-950 text-green-600 dark:text-green-400",
    }

    const sizes = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = "IconButton"
