import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/backend/services/task-service"

const taskService = new TaskService()

// GET - Find task by title
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const title = searchParams.get("title")

    if (!userId || !title) {
      return NextResponse.json({ error: "userId and title are required" }, { status: 400 })
    }

    const task = await taskService.getTaskByTitle(userId, title)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error finding task by title:", error)
    return NextResponse.json({ error: "Failed to find task" }, { status: 500 })
  }
}

// PUT - Update task by title
export async function PUT(request: NextRequest) {
  try {
    const { userId, title, ...updateData } = await request.json()

    if (!userId || !title) {
      return NextResponse.json({ error: "userId and title are required" }, { status: 400 })
    }

    const task = await taskService.updateTaskByTitle(userId, title, updateData)
    return NextResponse.json(task)
  } catch (error: any) {
    console.error("Error updating task by title:", error)
    if (error.message === "Task not found") {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

// DELETE - Delete task by title
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const title = searchParams.get("title")

    if (!userId || !title) {
      return NextResponse.json({ error: "userId and title are required" }, { status: 400 })
    }

    await taskService.deleteTaskByTitle(userId, title)
    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting task by title:", error)
    if (error.message === "Task not found") {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
