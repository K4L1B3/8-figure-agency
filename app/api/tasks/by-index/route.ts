import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/backend/services/task-service"

const taskService = new TaskService()

// GET - Find task by index (1-based)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const indexStr = searchParams.get("index")

    if (!userId || !indexStr) {
      return NextResponse.json({ error: "userId and index are required" }, { status: 400 })
    }

    const index = Number.parseInt(indexStr)
    if (isNaN(index) || index < 1) {
      return NextResponse.json({ error: "Index must be a positive number" }, { status: 400 })
    }

    const task = await taskService.getTaskByIndex(userId, index)

    if (!task) {
      return NextResponse.json({ error: "Task not found at this index" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error finding task by index:", error)
    return NextResponse.json({ error: "Failed to find task" }, { status: 500 })
  }
}

// PUT - Update task by index
export async function PUT(request: NextRequest) {
  try {
    const { userId, index, ...updateData } = await request.json()

    if (!userId || !index) {
      return NextResponse.json({ error: "userId and index are required" }, { status: 400 })
    }

    if (index < 1) {
      return NextResponse.json({ error: "Index must be a positive number" }, { status: 400 })
    }

    const task = await taskService.updateTaskByIndex(userId, index, updateData)
    return NextResponse.json(task)
  } catch (error: any) {
    console.error("Error updating task by index:", error)
    if (error.message === "Task not found") {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

// DELETE - Delete task by index
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const indexStr = searchParams.get("index")

    if (!userId || !indexStr) {
      return NextResponse.json({ error: "userId and index are required" }, { status: 400 })
    }

    const index = Number.parseInt(indexStr)
    if (isNaN(index) || index < 1) {
      return NextResponse.json({ error: "Index must be a positive number" }, { status: 400 })
    }

    await taskService.deleteTaskByIndex(userId, index)
    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting task by index:", error)
    if (error.message === "Task not found") {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
