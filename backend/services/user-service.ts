import { UserRepository } from "../repositories/user-repository"
import type { User } from "../config/types"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email)
  }

  async createUser(email: string): Promise<User> {
    return await this.userRepository.create(email)
  }

  async findOrCreateUser(email: string): Promise<User> {
    return await this.userRepository.findOrCreate(email)
  }
}
