import { type IUserCreateAttributes } from './user.dto'
import { type UserEntity } from './user.entity'

export interface IUserRepository {
  create: (createUserDto: IUserCreateAttributes) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<UserEntity | null>
  getByUsername: (username: string) => Promise<UserEntity | null>
  getById: (id: string) => Promise<UserEntity | null>
}
