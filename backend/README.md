# Backend Architecture

This backend follows a clean architecture pattern with three main layers:

## Structure

\`\`\`
backend/
├── db/
│   ├── supabase-client.ts    # Supabase client configuration
│   ├── types.ts               # TypeScript interfaces and types
│   ├── repositories/          # Data access layer
│   │   ├── user-repository.ts
│   │   └── task-repository.ts
│   └── services/              # Business logic layer
│       ├── user-service.ts
│       └── task-service.ts
\`\`\`

## Layers

### 1. Repository Layer
Direct database interactions using Supabase client. Handles CRUD operations.

### 2. Service Layer
Business logic and validation. Uses repositories for data access.

### 3. Controller Layer (API Routes)
HTTP request handling in `app/api/`. Uses services for operations.

## API Endpoints

### Users
- `POST /api/users` - Create or get user by email

### Tasks
- `GET /api/tasks?userId={id}` - Get all tasks for a user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a single task
- `PUT /api/tasks/{id}` - Update a task
- `PATCH /api/tasks/{id}` - Toggle task completion
- `DELETE /api/tasks/{id}` - Delete a task

## Database Setup

Run the SQL script in `scripts/001_create_tables.sql` to create the required tables:
- `users` table with email and id
- `tasks` table with user_id, title, description, and completed status
- Row Level Security (RLS) policies for data protection

## Environment Variables

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
