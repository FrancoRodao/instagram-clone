import { Table, Model, Column, DataType, HasMany, BelongsToMany } from 'sequelize-typescript'
import { type IUserCreateAttributes, DEFAULT_USER_ROLE, IRoles, type IUserModel, ROLES } from '../../domain'
import { SequelizePostCommentModel, SequelizePostLikeModel, SequelizePostModel, SequelizeUserTaggedInPostModel } from '../../../posts/infrastructure/models'
import { SequelizeUserFollowingModel } from './userFollowingModelImpl'
import { type IPostCommentModel, type IPostModel } from '../../../posts/domain'

@Table({
  modelName: 'user'
})
export class SequelizeUserModel extends
  Model<IUserModel, IUserCreateAttributes> implements IUserModel {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
    id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    fullName!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    age!: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
    email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    password!: string

  @Column({
    type: DataType.ENUM,
    values: ROLES,
    defaultValue: DEFAULT_USER_ROLE
  })
    role!: IRoles

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
    username!: string

  @Column({
    type: DataType.STRING,
    defaultValue: ''
  })
    biography!: string

  @Column({
    type: DataType.STRING,
    defaultValue: 'http://defaultimage.com'
  })
    profilePicture!: string

  // associations
  @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserFollowingModel, 'userId')
    userFollowed!: IUserModel[]

  @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserFollowingModel, 'userFollowedId')
    userFollowers!: IUserModel[]

  @HasMany(() => SequelizePostModel)
    posts!: IPostModel[]

  @BelongsToMany(() => SequelizePostModel, () => SequelizeUserTaggedInPostModel)
    postsTaggedIn!: IPostModel[]

  @BelongsToMany(() => SequelizePostModel, () => SequelizePostLikeModel)
    postsLiked!: IPostModel[]

  @HasMany(() => SequelizePostCommentModel)
    postsCommented!: IPostCommentModel[]
}
