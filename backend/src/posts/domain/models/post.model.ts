import { type IUserModel } from '../../../users/domain'
import { type IPostCommentModel } from './postCommentModel.model'

export interface IPostModel {
  readonly id: string
  readonly userAuthorId: string
  readonly description: string
  readonly mediaURLs: string[]
  // relationships
  readonly usersTagged: IUserModel[]
  readonly likes: IUserModel[]
  readonly comments: IPostCommentModel[]
}
