# Project Setup – To-Do List with Atomic Design

## Prerequisites

* Node.js 18+
* Supabase account
* OpenAI account (for AI description generation)

## Environment Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the example env file and create your local one:

```bash
cp .env.example .env.local
```

3. Fill in the variables in `.env.local`:

### Supabase

* Go to [https://supabase.com](https://supabase.com)
* Create a new project
* Go to **Settings > API**
* Copy the `URL` and paste it into `NEXT_PUBLIC_SUPABASE_URL`
* Copy the `anon/public key` and paste it into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### OpenAI

* Go to [https://platform.openai.com](https://platform.openai.com)
* Open **API Keys**
* Create a new key
* Paste it into `OPENAI_API_KEY`

## Database Setup

Run the SQL script located at `scripts/001_create_tables.sql` in your Supabase project:

1. Open the Supabase Dashboard
2. Go to **SQL Editor**
3. Paste the contents of `scripts/001_create_tables.sql`
4. Run the script

This will create:

* `users` table (to store users)
* `tasks` table (to store tasks linked to users)
* RLS (Row Level Security) policies to protect the data

## Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

### Frontend (Atomic Design)

```text
components/
├── atoms/          # Basic components (Checkbox, IconButton, TextInput)
├── molecules/      # Combination of atoms (TodoItem, AddTodoForm, FilterTabs)
└── organisms/      # Complex modules (TodoList, TodoHeader)
```

### Backend

```text
backend/
└── db/
    ├── supabase-client.ts    # Supabase client
    ├── types.ts              # TypeScript types
    ├── repositories/         # Database access layer
    └── services/             # Business logic
```

### API Endpoints

All endpoints live in `app/api/`:

* **POST** `/api/users` – create/fetch user by email
* **GET** `/api/tasks?userId={id}` – list all tasks for a user
* **POST** `/api/tasks` – create a new task
* **PUT** `/api/tasks/[id]` – update a task
* **DELETE** `/api/tasks/[id]` – delete a task
* **POST** `/api/generate-description` – generate description using AI

### Automation Integration (n8n, Zapier, etc.)

You can call the API endpoints directly from automations:

```json
// Example request to create a task
POST /api/tasks
Content-Type: application/json

{
  "user_id": "user-uuid",
  "title": "My task",
  "description": "Optional description",
  "completed": false
}
```

## Implemented Features

✅ Email-based login/identification
✅ Full task CRUD (Create, Read, Update, Delete)
✅ Supabase database persistence
✅ Inline task editing
✅ Filters (All, Active, Completed)
✅ Task counter
✅ Automatic AI description generation
✅ Responsive design with dark theme
✅ Atomic Design architecture
✅ RESTful API for external integrations
✅ Controller–Service–Repository pattern
