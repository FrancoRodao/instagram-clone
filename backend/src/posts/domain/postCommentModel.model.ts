import { IUserModel } from '../../users/domain'

export interface IPostCommentModel {
  readonly userId: string,
  readonly postId: string
  readonly commentBody: string

  // relationships
  readonly user: IUserModel
}
