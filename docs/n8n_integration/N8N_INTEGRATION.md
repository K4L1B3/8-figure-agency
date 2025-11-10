# n8n Integration for WhatsApp

This guide explains how to connect the tasks API to n8n so users can manage their tasks via WhatsApp.

## Available Endpoints for WhatsApp

### 1. List Tasks (WhatsApp formatted)

```http
GET /api/tasks/formatted?userId={userId}
```

Returns tasks already formatted with emojis and numbering for direct WhatsApp replies.

**Response:**

```json
{
  "message": "📋 *Your Tasks* (3):\n\n1. ⬜ *Buy milk*\n   Go to the supermarket\n\n2. ✅ *Study Next.js*\n\n3. ⬜ *Work out*"
}
```

### 2. Get Task by Title

```http
GET /api/tasks/by-title?userId={userId}&title={title}
```

Searches a task by title (partial, case-insensitive).

### 3. Get Task by Index

```http
GET /api/tasks/by-index?userId={userId}&index={index}
```

Fetches a task by its position in the list (index starts at 1).

### 4. Create Task

```http
POST /api/tasks
Content-Type: application/json

{
  "userId": "user@example.com",
  "title": "New task",
  "description": "Optional description"
}
```

### 5. Update Task by Title

```http
PUT /api/tasks/by-title
Content-Type: application/json

{
  "userId": "user@example.com",
  "title": "Buy milk",
  "completed": true,
  "description": "New description"
}
```

### 6. Update Task by Index

```http
PUT /api/tasks/by-index
Content-Type: application/json

{
  "userId": "user@example.com",
  "index": 1,
  "completed": true,
  "description": "New description"
}
```

### 7. Delete Task by Title

```http
DELETE /api/tasks/by-title?userId={userId}&title={title}
```

### 8. Delete Task by Index

```http
DELETE /api/tasks/by-index?userId={userId}&index={index}
```

## n8n + WhatsApp Flow

### Example 1: List Tasks

**WhatsApp message:** `lista` or `my tasks`

**n8n flow:**

1. Webhook receives the WhatsApp message
2. Extracts user email/phone as `userId`
3. HTTP Request: `GET /api/tasks/formatted?userId={userId}`
4. Sends the formatted text back to WhatsApp

### Example 2: Add Task

**WhatsApp message:** `add Buy milk`

**n8n flow:**

1. Webhook receives the message
2. Extract the title using regex after `add`
3. HTTP Request: `POST /api/tasks` with body:

   ```json
   {
     "userId": "{userId}",
     "title": "Buy milk"
   }
   ```
4. Reply on WhatsApp: `Task "Buy milk" added!`

### Example 3: Mark Task as Done

**WhatsApp message:** `done 1` or `done Buy milk`

**n8n flow:**

1. Detect if the user sent a number or text
2. If number: `PUT /api/tasks/by-index` with `index`
3. If text: `PUT /api/tasks/by-title` with `title`
4. Body: `{"userId": "{userId}", "completed": true}`
5. Confirm on WhatsApp

### Example 4: Edit Description

**WhatsApp message:** `edit 1 Buy skimmed milk at the store`

**n8n flow:**

1. Extract index and new description
2. HTTP Request: `PUT /api/tasks/by-index`
3. Body:

   ```json
   {
     "userId": "{userId}",
     "index": 1,
     "description": "Buy skimmed milk at the store"
   }
   ```

### Example 5: Delete Task

**WhatsApp message:** `delete 1` or `remove Buy milk`

**n8n flow:**

1. Detect command and parameter
2. If number: `DELETE /api/tasks/by-index?userId={userId}&index=1`
3. If text: `DELETE /api/tasks/by-title?userId={userId}&title=Buy milk`
4. Confirm deletion

## Suggested WhatsApp Commands

* **lista** – list all tasks
* **adicionar [title]** – add a new task
* **concluir [number/title]** – mark task as completed
* **pendente [number/title]** – mark task as pending
* **editar [number] [new description]** – edit description
* **deletar [number/title]** – remove task
* **ajuda** – show available commands

(You can translate the actual command words to your bot’s language.)

## n8n Setup

### 1. Webhook Node (Trigger)

* Configure the webhook to receive messages from your WhatsApp provider (WAHA, WhatsApp Business API, Twilio, etc.)

### 2. Function Node (Parser)

* Parse the message to extract the command and params
* Get the sender’s phone/email to use as `userId`

### 3. Switch Node

* Route to different branches based on the detected command

### 4. HTTP Request Nodes

* Use your API base URL
* Add headers if needed
* Pass the correct params/body

### 5. Response Node

* Format and send the reply back to WhatsApp

## Important Notes

* Always use the user’s **email or phone** as `userId` to keep things consistent
* Title search is case-insensitive and supports partial matches
* Indexes start at 1 (more natural for end users)
* Always verify the `userId` before performing operations
* Prefer the `/formatted` endpoint when you want WhatsApp-ready text
