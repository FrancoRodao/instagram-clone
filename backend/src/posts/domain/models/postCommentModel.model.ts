import { type IUserModel } from '../../../users/domain'

export interface IPostCommentModel {
  readonly commentId: string
  readonly userAuthorId: string
  readonly postId: string
  readonly commentBody: string

  // relationships
  readonly user: IUserModel
}
