import { type IUserDto } from './user.dto'
import { type UserEntity } from './user.entity'

export interface IUserRepository {
  create: (createUserDto: IUserDto) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<UserEntity | null>
  getByUsername: (username: string) => Promise<UserEntity | null>
  getById: (email: string) => Promise<UserEntity | null>
}
