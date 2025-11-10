import { TaskRepository } from "../repositories/task-repository"
import type { Task, CreateTaskDto, UpdateTaskDto } from "../config/types"

export class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  async getAllTasksByUser(userId: string): Promise<Task[]> {
    return await this.taskRepository.findAllByUserId(userId)
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.taskRepository.findById(id)
  }

  async createTask(userId: string, taskData: CreateTaskDto): Promise<Task> {
    if (!taskData.title || taskData.title.trim() === "") {
      throw new Error("Task title is required")
    }
    return await this.taskRepository.create(userId, taskData)
  }

  async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id)
    if (!existingTask) {
      throw new Error("Task not found")
    }
    return await this.taskRepository.update(id, taskData)
  }

  async deleteTask(id: string): Promise<void> {
    const existingTask = await this.taskRepository.findById(id)
    if (!existingTask) {
      throw new Error("Task not found")
    }
    await this.taskRepository.delete(id)
  }

  async toggleTaskCompletion(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id)
    if (!task) {
      throw new Error("Task not found")
    }
    return await this.taskRepository.update(id, { completed: !task.completed })
  }

  async getTaskByTitle(userId: string, title: string): Promise<Task | null> {
    return await this.taskRepository.findByTitle(userId, title)
  }

  async getTaskByIndex(userId: string, index: number): Promise<Task | null> {
    if (index < 1) {
      throw new Error("Index must be greater than 0")
    }
    return await this.taskRepository.findByIndex(userId, index - 1)
  }

  async updateTaskByTitle(userId: string, title: string, taskData: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findByTitle(userId, title)
    if (!task) {
      throw new Error("Task not found")
    }
    return await this.taskRepository.update(task.id, taskData)
  }

  async updateTaskByIndex(userId: string, index: number, taskData: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskByIndex(userId, index)
    if (!task) {
      throw new Error("Task not found")
    }
    return await this.taskRepository.update(task.id, taskData)
  }

  async deleteTaskByTitle(userId: string, title: string): Promise<void> {
    const task = await this.taskRepository.findByTitle(userId, title)
    if (!task) {
      throw new Error("Task not found")
    }
    await this.taskRepository.delete(task.id)
  }

  async deleteTaskByIndex(userId: string, index: number): Promise<void> {
    const task = await this.getTaskByIndex(userId, index)
    if (!task) {
      throw new Error("Task not found")
    }
    await this.taskRepository.delete(task.id)
  }

  async getTasksFormatted(userId: string): Promise<string> {
    const tasks = await this.taskRepository.findAllByUserId(userId)

    if (tasks.length === 0) {
      return "Você não tem tarefas cadastradas."
    }

    let formatted = `📋 *Suas Tarefas* (${tasks.length}):\n\n`

    tasks.forEach((task, index) => {
      const status = task.completed ? "✅" : "⬜"
      formatted += `${index + 1}. ${status} *${task.title}*\n`
      if (task.description) {
        formatted += `   ${task.description}\n`
      }
      formatted += "\n"
    })

    return formatted.trim()
  }
}
