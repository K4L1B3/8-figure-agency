# Integração com n8n para WhatsApp

Este guia explica como integrar a API de tarefas com o n8n para permitir que usuários gerenciem suas tarefas via WhatsApp.

## Endpoints Disponíveis para WhatsApp

### 1. Listar Tarefas (Formatado para WhatsApp)
\`\`\`
GET /api/tasks/formatted?userId={userId}
\`\`\`
Retorna as tarefas formatadas com emojis e numeração para envio direto no WhatsApp.

**Resposta:**
\`\`\`json
{
  "message": "📋 *Suas Tarefas* (3):\n\n1. ⬜ *Comprar leite*\n   Ir ao mercado\n\n2. ✅ *Estudar Next.js*\n\n3. ⬜ *Fazer exercícios*"
}
\`\`\`

### 2. Buscar Tarefa por Título
\`\`\`
GET /api/tasks/by-title?userId={userId}&title={title}
\`\`\`
Busca uma tarefa pelo título (busca parcial, case-insensitive).

### 3. Buscar Tarefa por Índice
\`\`\`
GET /api/tasks/by-index?userId={userId}&index={index}
\`\`\`
Busca uma tarefa pela sua posição na lista (índice começa em 1).

### 4. Criar Tarefa
\`\`\`
POST /api/tasks
Content-Type: application/json

{
  "userId": "user@example.com",
  "title": "Nova tarefa",
  "description": "Descrição opcional"
}
\`\`\`

### 5. Atualizar Tarefa por Título
\`\`\`
PUT /api/tasks/by-title
Content-Type: application/json

{
  "userId": "user@example.com",
  "title": "Comprar leite",
  "completed": true,
  "description": "Nova descrição"
}
\`\`\`

### 6. Atualizar Tarefa por Índice
\`\`\`
PUT /api/tasks/by-index
Content-Type: application/json

{
  "userId": "user@example.com",
  "index": 1,
  "completed": true,
  "description": "Nova descrição"
}
\`\`\`

### 7. Deletar Tarefa por Título
\`\`\`
DELETE /api/tasks/by-title?userId={userId}&title={title}
\`\`\`

### 8. Deletar Tarefa por Índice
\`\`\`
DELETE /api/tasks/by-index?userId={userId}&index={index}
\`\`\`

## Fluxo de Integração n8n + WhatsApp

### Exemplo 1: Listar Tarefas
**Mensagem WhatsApp:** "lista" ou "minhas tarefas"

**Fluxo n8n:**
1. Webhook recebe mensagem do WhatsApp
2. Extrai email/telefone do usuário como userId
3. HTTP Request: `GET /api/tasks/formatted?userId={userId}`
4. Envia resposta formatada de volta no WhatsApp

### Exemplo 2: Adicionar Tarefa
**Mensagem WhatsApp:** "adicionar Comprar leite"

**Fluxo n8n:**
1. Webhook recebe mensagem
2. Extrai título usando regex após "adicionar"
3. HTTP Request: `POST /api/tasks` com body:
   \`\`\`json
   {
     "userId": "{userId}",
     "title": "Comprar leite"
   }
   \`\`\`
4. Confirma no WhatsApp: "Tarefa 'Comprar leite' adicionada!"

### Exemplo 3: Marcar Tarefa como Concluída
**Mensagem WhatsApp:** "concluir 1" ou "concluir Comprar leite"

**Fluxo n8n:**
1. Detecta se é número ou texto
2. Se número: `PUT /api/tasks/by-index` com index
3. Se texto: `PUT /api/tasks/by-title` com title
4. Body: `{"userId": "{userId}", "completed": true}`
5. Confirma no WhatsApp

### Exemplo 4: Editar Descrição
**Mensagem WhatsApp:** "editar 1 Comprar leite desnatado no mercado"

**Fluxo n8n:**
1. Extrai índice e nova descrição
2. HTTP Request: `PUT /api/tasks/by-index`
3. Body:
   \`\`\`json
   {
     "userId": "{userId}",
     "index": 1,
     "description": "Comprar leite desnatado no mercado"
   }
   \`\`\`

### Exemplo 5: Deletar Tarefa
**Mensagem WhatsApp:** "deletar 1" ou "remover Comprar leite"

**Fluxo n8n:**
1. Identifica comando e parâmetro
2. Se número: `DELETE /api/tasks/by-index?userId={userId}&index=1`
3. Se texto: `DELETE /api/tasks/by-title?userId={userId}&title=Comprar leite`
4. Confirma exclusão

## Comandos Sugeridos para WhatsApp

- **lista** - Lista todas as tarefas
- **adicionar [título]** - Adiciona nova tarefa
- **concluir [número/título]** - Marca tarefa como concluída
- **pendente [número/título]** - Marca tarefa como pendente
- **editar [número] [nova descrição]** - Edita descrição
- **deletar [número/título]** - Remove tarefa
- **ajuda** - Mostra comandos disponíveis

## Configuração no n8n

### 1. Webhook Node (Trigger)
- Configure o webhook para receber mensagens do WhatsApp Business API ou Twilio

### 2. Function Node (Parser)
- Extrai comando e parâmetros da mensagem
- Identifica userId do remetente

### 3. Switch Node
- Roteia para diferentes fluxos baseado no comando

### 4. HTTP Request Nodes
- Configura URLs base da sua API
- Adiciona headers se necessário
- Passa parâmetros corretos

### 5. Response Node
- Formata e envia resposta de volta no WhatsApp

## Dicas Importantes

- Use o **email** ou **telefone** do usuário como `userId` para consistência
- A busca por título é case-insensitive e aceita matches parciais
- Índices começam em 1 (mais natural para usuários)
- Sempre valide se o userId existe antes de fazer operações
- Use o endpoint `/formatted` para obter texto pronto para WhatsApp
