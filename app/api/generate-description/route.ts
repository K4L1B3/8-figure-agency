import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { title } = await request.json()

    if (!title || typeof title !== "string") {
      return Response.json({ error: "Title is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are an assistant that generates SHORT and organized task descriptions for a to-do app.
Context:


The text will be shown inside a small card.


I need a readable description, no big titles, no heavy markdown.


No ###, no bold, no huge text.


Task: "${title}"
Exact format you must return:
Description: 1-line sentence saying what the task is.
Steps:


short step 1


short step 2


short step 3
Notes: if there is something useful, 1 line. If not, write "—".


Important rules:


Do not exceed 120 words in total.


Use short sentences.


Use only bullets with "-".


Do not invent too much context.


Write in English.

`,
      temperature: 0.7,
     maxOutputTokens: 500,
    })

    return Response.json({ description: text })
  } catch (error) {
    console.error("Error generating description:", error)
    return Response.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
