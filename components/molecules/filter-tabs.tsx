// MOLECULES - Filter Tabs Pattern
// Tab navigation for filtering todo items

"use client"

import { cn } from "@/lib/utils"

export type FilterType = "all" | "active" | "completed"

interface FilterTabsProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ]

  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            activeFilter === filter.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {filter.label}
          <span className="ml-2 text-xs opacity-60">({counts[filter.value]})</span>
        </button>
      ))}
    </div>
  )
}
