import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/backend/services/user-service"

const userService = new UserService()

// POST - Create or get user by email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const user = await userService.findOrCreateUser(email)
    return NextResponse.json(user)
  } catch (error) {
    console.error("[v0] Error creating/finding user:", error)
    return NextResponse.json({ error: "Failed to process user" }, { status: 500 })
  }
}
