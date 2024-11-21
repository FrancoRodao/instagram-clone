import { type IPostCommentModel, type IPostModel } from '../../posts/domain'

// IRoles and ROLES must be synchronized, ROLES act as value and IRoles acts as interface
export const ROLES = ['USER', 'MODERATOR', 'ADMIN'] as const
export type IRoles = typeof ROLES[number]
export const DEFAULT_USER_ROLE = 'USER'
if (!ROLES.includes(DEFAULT_USER_ROLE)) throw new Error('DEFAULT_USER_ROLE must be in ROLES_ENUMS')

export interface IUserModel {
  readonly id: string
  readonly fullName: string
  readonly age: number
  readonly email: string
  readonly password: string
  readonly role: IRoles

  readonly username: string
  readonly biography: string | null
  readonly profilePicture: string | null

  // relationships
  readonly userFollowers: IUserModel[]
  readonly userFollowed: IUserModel[]
  readonly posts: IPostModel[]
  readonly postsTaggedIn: IPostModel[]
  readonly postsLiked: IPostModel[]
  readonly postsCommented: IPostCommentModel[]
}
