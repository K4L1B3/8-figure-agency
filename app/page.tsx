// COMPLEX ORGANISM / TEMPLATE - Todo Page
// Complete application combining all organisms and molecules

"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TodoHeader } from "@/components/organisms/todo-header"
import { AddTodoForm } from "@/components/molecules/add-todo-form"
import { FilterTabs, type FilterType } from "@/components/molecules/filter-tabs"
import { TodoList } from "@/components/organisms/todo-list"
import type { Todo } from "@/components/molecules/todo-item"

export default function TodoPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const id = localStorage.getItem("userId")

    if (!email || !id) {
      router.push("/login")
    } else {
      setUserEmail(email)
      setUserId(id)
      loadTasks(id)
    }
  }, [router])

  const loadTasks = async (userId: string) => {
    try {
      const response = await fetch(`/api/tasks?userId=${userId}`)
      if (!response.ok) throw new Error("Failed to fetch tasks")

      const tasks = await response.json()

      // Map API response to Todo format
      const mappedTodos: Todo[] = tasks.map((task: any) => ({
        id: task.id,
        text: task.title,
        description: task.description,
        completed: task.completed,
      }))

      setTodos(mappedTodos)
    } catch (err) {
      console.error("[v0] Error loading tasks:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Filtered todos based on active filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed)
      case "completed":
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  // Statistics for header and filter tabs
  const stats = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos],
  )

  const handleAddTodo = async (text: string, description?: string) => {
    if (!userId) return

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: text,
          description: description || null,
          completed: false,
        }),
      })

      if (!response.ok) throw new Error("Failed to create task")

      const newTask = await response.json()

      const newTodo: Todo = {
        id: newTask.id,
        text: newTask.title,
        description: newTask.description,
        completed: newTask.completed,
      }

      setTodos([newTodo, ...todos])
    } catch (err) {
      console.error("[v0] Error creating task:", err)
    }
  }

  const handleToggleTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
      })

      if (!response.ok) throw new Error("Failed to toggle task")

      const updatedTask = await response.json()

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: updatedTask.completed } : todo)))
    } catch (err) {
      console.error("[v0] Error toggling task:", err)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error("[v0] Error deleting task:", err)
    }
  }

  const handleEditTodo = async (id: string, newText: string, newDescription?: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newText,
          description: newDescription || null,
        }),
      })

      if (!response.ok) throw new Error("Failed to update task")

      const updatedTask = await response.json()

      setTodos(
        todos.map((t) =>
          t.id === id
            ? {
                ...t,
                text: updatedTask.title,
                description: updatedTask.description,
              }
            : t,
        ),
      )
    } catch (err) {
      console.error("[v0] Error updating task:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Logado como: <span className="text-foreground font-medium">{userEmail}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sair
          </button>
        </div>

        <TodoHeader totalTodos={stats.all} completedTodos={stats.completed} />

        <div className="space-y-6">
          <AddTodoForm onAdd={handleAddTodo} />

          <FilterTabs activeFilter={filter} onFilterChange={setFilter} counts={stats} />

          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </div>
      </div>
    </main>
  )
}
