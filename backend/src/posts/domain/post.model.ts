import { type IUserModel } from '../../users/domain'
import { type IPostCommentModel } from './postCommentModel.model'
import { type IPostLikeModel } from './postLike.model'

export interface IPostModel {
  readonly id: string
  readonly userAuthorId: string
  readonly description: string
  readonly images: string[]
  // relationships
  readonly usersTagged: IUserModel[]
  readonly likes: IPostLikeModel[]
  readonly comments: IPostCommentModel[]
}
