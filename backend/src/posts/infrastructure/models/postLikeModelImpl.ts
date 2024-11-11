import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { type IPostLikeModel } from '../../domain'
import { SequelizeUserModel } from '../../../users/infrastructure/models'
import { SequelizePostModel } from './postModelImpl'

@Table({
  modelName: 'postLike'
})
export class SequelizePostLikeModel extends
  Model<IPostLikeModel, IPostLikeModel> implements IPostLikeModel {
  @ForeignKey(() => SequelizeUserModel)
  @Column
    userId!: string

  @ForeignKey(() => SequelizePostModel)
  @Column
    postId!: string
}
