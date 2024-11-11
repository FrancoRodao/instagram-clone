import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { type IPostCommentModel } from '../../domain'
import { SequelizeUserModel } from '../../../users/infrastructure/models'
import { SequelizePostModel } from './postModelImpl'
import { IUserModel } from '../../../users/domain'
import { type Optional } from '../../../types'

type PostCommentCreationAttributes = Optional<IPostCommentModel, 'commentId' | 'user'>

@Table({
  modelName: 'postComment'
})
export class SequelizePostCommentModel extends
  Model<IPostCommentModel, PostCommentCreationAttributes> implements IPostCommentModel {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    commentId!: string

  @ForeignKey(() => SequelizeUserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
    userAuthorId!: string

  @ForeignKey(() => SequelizePostModel)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
    postId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    commentBody!: string

  // associations
  @BelongsTo(() => SequelizeUserModel)
    user!: IUserModel
}
