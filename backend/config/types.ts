export interface User {
  id: string
  email: string
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateTaskDto {
  title: string
  description?: string
  completed?: boolean
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  completed?: boolean
}
