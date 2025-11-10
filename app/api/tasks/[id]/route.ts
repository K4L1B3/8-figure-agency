import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/backend/services/task-service"
import type { UpdateTaskDto } from "@/backend/config/types"

const taskService = new TaskService()

// GET - Get a single task by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const task = await taskService.getTaskById(params.id)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("[v0] Error fetching task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

// PUT - Update a task
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskData: UpdateTaskDto = await request.json()
    const task = await taskService.updateTask(params.id, taskData)
    return NextResponse.json(task)
  } catch (error) {
    console.error("[v0] Error updating task:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update task" },
      { status: error instanceof Error && error.message === "Task not found" ? 404 : 500 },
    )
  }
}

// PATCH - Toggle task completion
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const task = await taskService.toggleTaskCompletion(params.id)
    return NextResponse.json(task)
  } catch (error) {
    console.error("[v0] Error toggling task:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to toggle task" },
      { status: error instanceof Error && error.message === "Task not found" ? 404 : 500 },
    )
  }
}

// DELETE - Delete a task
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await taskService.deleteTask(params.id)
    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting task:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete task" },
      { status: error instanceof Error && error.message === "Task not found" ? 404 : 500 },
    )
  }
}
