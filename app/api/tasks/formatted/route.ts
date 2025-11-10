import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/backend/services/task-service"

const taskService = new TaskService()

// GET - Get tasks formatted for WhatsApp
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const formattedTasks = await taskService.getTasksFormatted(userId)
    return NextResponse.json({ message: formattedTasks })
  } catch (error) {
    console.error("Error getting formatted tasks:", error)
    return NextResponse.json({ error: "Failed to get tasks" }, { status: 500 })
  }
}
