import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { type IPostCommentModel, type IPostModel } from '../../domain'
import { type IUserModel } from '../../../users/domain'
import { SequelizeUserModel } from '../../../users/infrastructure/models'
import { SequelizeUserTaggedInPostModel } from './userTaggedInPostModelImpl'
import { SequelizePostCommentModel } from './postCommentModelImpl'
import { SequelizePostLikeModel } from './postLikeModelImpl'
import { type ICreatePostDto } from '../../domain/post.dto'

@Table({
  modelName: 'post'
})
export class SequelizePostModel extends
  Model<IPostModel, ICreatePostDto> implements IPostModel {
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
    mediaURLs!: string[]

  // associations
  @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserTaggedInPostModel)
    usersTagged!: IUserModel[]

  @HasMany(() => SequelizePostCommentModel)
    comments!: IPostCommentModel[]

  @BelongsToMany(() => SequelizeUserModel, () => SequelizePostLikeModel)
    likes!: IUserModel[]
}
