import { type IPostModel } from '../models/post.model'
import { type IPostDto } from '../post.dto'
import { type IUserModel } from '../../../users/domain'
import { type IPostCommentModel } from '../models/postCommentModel.model'

export class PostEntity implements IPostModel {
  public readonly id: string
  public readonly userAuthorId: string
  public description: string
  public readonly mediaURLs: string[]
  public comments: IPostCommentModel[]
  public likes: IUserModel[]
  public usersTagged: IUserModel[]

  constructor ({
    id, userAuthorId, comments = [], description = '',
    mediaURLs = [], likes = [], usersTagged = []
  }: IPostModel) {
    this.id = id
    this.userAuthorId = userAuthorId
    this.comments = comments
    this.description = description
    this.mediaURLs = mediaURLs
    this.likes = likes
    this.usersTagged = usersTagged
  }

  transformToPostDto (): IPostDto {
    return {
      id: this.id,
      userAuthorId: this.userAuthorId,
      comments: this.comments,
      description: this.description,
      mediaURLs: this.mediaURLs,
      likes: this.likes,
      usersTagged: this.usersTagged
    }
  }
}
