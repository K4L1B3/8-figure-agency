// ORGANISMS - Todo Header Module
// Application header with title and statistics

"use client"

import { CheckCircle2 } from "lucide-react"

interface TodoHeaderProps {
  totalTodos: number
  completedTodos: number
}

export function TodoHeader({ totalTodos, completedTodos }: TodoHeaderProps) {
  const percentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  return (
    <div className="text-center space-y-4 pb-8 border-b border-border">
      <div className="flex items-center justify-center gap-3">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold text-foreground text-balance">My Todo List</h1>
      </div>

      {totalTodos > 0 && (
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold text-foreground">{totalTodos}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-semibold text-foreground">{completedTodos}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-semibold text-primary">{percentage}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
