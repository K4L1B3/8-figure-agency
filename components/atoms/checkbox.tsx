// ATOMS - Basic UI Components
// Simple, single-purpose components that can't be broken down further

"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer h-5 w-5 appearance-none rounded-full border-2 border-neutral-600",
            "checked:bg-primary checked:border-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "cursor-pointer transition-all duration-300 ease-in-out",
            "hover:border-primary hover:scale-110",
            "checked:scale-100",
            className,
          )}
          {...props}
        />
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300 ease-in-out"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.5L6 12L2.5 8.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && <label className="text-sm text-foreground cursor-pointer select-none">{label}</label>}
    </div>
  )
})

Checkbox.displayName = "Checkbox"
