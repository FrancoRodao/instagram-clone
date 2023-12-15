import { IPostCommentModel, IPostLikeModel, IPostModel } from '../../posts/domain'
import { IRoles, IUserModel } from './user.model'

export class UserEntity implements IUserModel {
  public readonly id: string
  public readonly fullName: string
  public readonly age: number
  public readonly email: string
  public readonly password: string
  public readonly role: IRoles

  public readonly username: string
  public readonly biography: string
  public readonly profilePicture: string

  public readonly userFollowers: IUserModel[]
  public readonly userFollowed: IUserModel[]
  public readonly posts: IPostModel[]
  public readonly postsTaggedIn: IPostModel[]
  public readonly postsLiked: IPostLikeModel[]
  public readonly postsCommented: IPostCommentModel[]

  constructor ({
    id, fullName, age, email, password, role,
    username, biography, profilePicture,
    userFollowers = [], userFollowed = [],
    posts = [], postsLiked = [], postsTaggedIn = [], postsCommented = []
  }: IUserModel) {
    this.id = id
    this.fullName = fullName
    this.age = age
    this.email = email
    this.password = password
    this.role = role

    this.username = username
    this.biography = biography
    this.profilePicture = profilePicture

    this.userFollowers = userFollowers
    this.userFollowed = userFollowed

    this.posts = posts
    this.postsTaggedIn = postsTaggedIn
    this.postsLiked = postsLiked
    this.postsCommented = postsCommented
  }
}
