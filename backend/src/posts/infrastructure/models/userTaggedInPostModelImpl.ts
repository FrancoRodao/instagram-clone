import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { type IUserTaggedInPost } from '../../domain'
import { SequelizeUserModel } from '../../../users/infrastructure/models'
import { SequelizePostModel } from './postModelImpl'

@Table({
  modelName: 'userTaggedInPost',
  tableName: 'userTaggedInPost'
})
export class SequelizeUserTaggedInPostModel extends
  Model<IUserTaggedInPost, IUserTaggedInPost> implements IUserTaggedInPost {
  @ForeignKey(() => SequelizeUserModel)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    userId!: string

  @ForeignKey(() => SequelizePostModel)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    postId!: string
}
