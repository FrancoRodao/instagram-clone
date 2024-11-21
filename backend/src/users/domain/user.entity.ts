import { type IPostCommentModel, type IPostModel } from '../../posts/domain'
import { type IRoles, type IUserModel } from './user.model'
import { type IUserDto } from './user.dto'

export class UserEntity implements IUserModel {
  public readonly id: string
  public readonly fullName: string
  public readonly age: number
  public readonly email: string
  public readonly password: string
  public readonly role: IRoles

  public readonly username: string
  public readonly biography: string | null
  public readonly profilePicture: string | null

  public readonly userFollowers: IUserModel[]
  public readonly userFollowed: IUserModel[]
  public readonly posts: IPostModel[]
  public readonly postsTaggedIn: IPostModel[]
  public readonly postsLiked: IPostModel[]
  public readonly postsCommented: IPostCommentModel[]

  constructor ({
    id, fullName, age, email, password, role,
    username, biography = null, profilePicture = null,
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

  transformToUserDto (): IUserDto {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      age: this.age,
      username: this.username,
      biography: this.biography,
      profilePicture: this.profilePicture,
      userFollowers: this.userFollowers,
      userFollowed: this.userFollowed,
      posts: this.posts,
      postsTaggedIn: this.postsTaggedIn,
      postsLiked: this.postsLiked,
      postsCommented: this.postsCommented
    }
  }
}
