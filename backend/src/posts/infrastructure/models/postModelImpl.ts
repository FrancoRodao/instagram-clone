import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { IPostCommentModel, IPostLikeModel, IPostModel } from '../../domain'
import { IUserModel } from '../../../users/domain'
import { SequelizeUserModel } from '../../../users/infrastructure'
import { SequelizeUserTaggedInPostModel } from './userTaggedInPostModelImpl'
import { SequelizePostCommentModel } from './postCommentModelImpl'
import { Optional } from '../../../types'
import { SequelizePostLikeModel } from './postLikeModelImpl'

type PostModelCreationAttributes = Optional<IPostModel, 'id'>;

@Table({
  modelName: 'post'
})
export class SequelizePostModel extends
  Model<IPostModel, PostModelCreationAttributes> implements IPostModel {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    id!: string

  @ForeignKey(() => SequelizeUserModel)
    userAuthorId!: string

  // is not necessary
  // @BelongsTo(() => SequelizeUserModel)
  //   userAuthor!: IUserModel

  @Column({
    type: DataType.STRING
  })
    description!: string

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: []
  })
    images!: string[]

  // associations
  @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserTaggedInPostModel)
    usersTagged!: IUserModel[]

  @HasMany(() => SequelizePostCommentModel)
    comments!: IPostCommentModel[]

  @HasMany(() => SequelizePostLikeModel)
    likes!: IPostLikeModel[]
}
