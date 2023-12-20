import { ForeignKey, Model, Table } from 'sequelize-typescript'
import { IPostLikeModel } from '../../domain'
import { SequelizeUserModel } from '../../../users/infrastructure'
import { SequelizePostModel } from './postModelImpl'

@Table({
  modelName: 'postLike'
})
export class SequelizePostLikeModel extends
  Model<IPostLikeModel, IPostLikeModel> implements IPostLikeModel {
  @ForeignKey(() => SequelizeUserModel)
    userId!: string

  @ForeignKey(() => SequelizePostModel)
    postId!: string
}
