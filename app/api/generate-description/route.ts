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
      prompt: `Você é um assistente que gera descrições de tarefas CURTAS e organizadas para um app de to-do.

Contexto:
- O texto será exibido dentro de um card pequeno.
- Preciso de uma descrição legível, sem títulos grandes, sem markdown pesado.
- Nada de ###, nada de **negrito**, nada de texto gigantesco.

Tarefa: "${title}"

Formato exato que você deve devolver:

Descrição: frase de 1 linha dizendo o que é a tarefa.
Passos:
- passo 1 curto
- passo 2 curto
- passo 3 curto
Observações: se houver algo útil, 1 linha. Se não, escreva "—".

Regras importantes:
- Não ultrapasse 120 palavras no total.
- Use frases curtas.
- Use somente bullets com "-".
- Não invente contexto demais.
- Escreva em português do Brasil.`,
      temperature: 0.7,
     maxOutputTokens: 500,
    })

    return Response.json({ description: text })
  } catch (error) {
    console.error("Error generating description:", error)
    return Response.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
