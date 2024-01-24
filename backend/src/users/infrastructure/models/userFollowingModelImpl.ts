import { Table, DataType, Column, Model, ForeignKey } from 'sequelize-typescript'
import { SequelizeUserModel } from '..'
import { type IUserFollowing } from '../../domain'

@Table({
  modelName: 'userFollowing'
})
export class SequelizeUserFollowingModel extends
  Model<IUserFollowing, IUserFollowing> implements IUserFollowing {
  @ForeignKey(() => SequelizeUserModel)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    userId!: string

  @ForeignKey(() => SequelizeUserModel)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    userFollowedId!: string
}
