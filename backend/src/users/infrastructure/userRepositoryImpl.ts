import { type IUserDto, type IUserRepository, UserEntity } from '../domain'
import { SequelizeUserModel } from './models/userModelImpl'

export class SequelizeUserRepository implements IUserRepository {
  async create (createUserAttributes: IUserDto): Promise<UserEntity> {
    const newUser = await SequelizeUserModel.create(createUserAttributes)

    const userValues = newUser.dataValues

    return new UserEntity(userValues)
  }

  async getByEmail (email: string): Promise<UserEntity | null> {
    const userFound = await SequelizeUserModel.findOne({
      where: { email }
    })

    return (userFound != null) ? new UserEntity(userFound.dataValues) : null
  }

  async getByUsername (username: string): Promise<UserEntity | null> {
    const userFound = await SequelizeUserModel.findOne({
      where: { username }
    })

    return (userFound != null) ? new UserEntity(userFound.dataValues) : null
  }

  async getById (id: string): Promise<UserEntity | null> {
    const userFound = await SequelizeUserModel.findByPk(id)

    return (userFound != null) ? new UserEntity(userFound.dataValues) : null
  }
}
