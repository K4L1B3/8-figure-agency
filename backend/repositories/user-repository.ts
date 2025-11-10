import { supabase } from "../db/supabase-client"
import type { User } from "../config/types"

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") return null
      throw error
    }

    return data
  }

  async create(email: string): Promise<User> {
    const { data, error } = await supabase.from("users").insert({ email }).select().single()

    if (error) throw error
    return data
  }

  async findOrCreate(email: string): Promise<User> {
    const existingUser = await this.findByEmail(email)
    if (existingUser) return existingUser
    return await this.create(email)
  }
}
