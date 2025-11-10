import { supabase } from "../db/supabase-client"
import type { Task, CreateTaskDto, UpdateTaskDto } from "../config/types"

export class TaskRepository {
  async findAllByUserId(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<Task | null> {
    const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") return null
      throw error
    }

    return data
  }

  async create(userId: string, taskData: CreateTaskDto): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: userId,
        title: taskData.title,
        description: taskData.description || null,
        completed: taskData.completed || false,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async update(id: string, taskData: UpdateTaskDto): Promise<Task> {
    const updateData: any = {
      ...taskData,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("tasks").update(updateData).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) throw error
  }

  async findByTitle(userId: string, title: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .ilike("title", `%${title}%`)
      .order("created_at", { ascending: false })
      .limit(1)

    if (error) throw error
    return data && data.length > 0 ? data[0] : null
  }

  async findByIndex(userId: string, index: number): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(index, index)

    if (error) throw error
    return data && data.length > 0 ? data[0] : null
  }
}
