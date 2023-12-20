import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { IPostCommentModel } from '../../domain'
import { SequelizeUserModel } from '../../../users/infrastructure'
import { SequelizePostModel } from './postModelImpl'
import { IUserModel } from '../../../users/domain'
import { Optional } from '../../../types'

type PostCommentCreationAttributes = Optional<IPostCommentModel, 'user'>;

@Table({
  modelName: 'postComment'
})
export class SequelizePostCommentModel extends
  Model<IPostCommentModel, PostCommentCreationAttributes> implements IPostCommentModel {
  @ForeignKey(() => SequelizeUserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
    userId!: string

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
