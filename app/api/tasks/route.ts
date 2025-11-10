import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/backend/services/task-service"
import type { CreateTaskDto } from "@/backend/config/types"

const taskService = new TaskService()

// GET - List all tasks for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const tasks = await taskService.getAllTasksByUser(userId)
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("[v0] Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...taskData } = body as { userId: string } & CreateTaskDto

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const task = await taskService.createTask(userId, taskData)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating task:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create task" },
      { status: 500 },
    )
  }
}
