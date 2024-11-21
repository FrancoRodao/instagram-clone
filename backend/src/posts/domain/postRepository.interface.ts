import { type PostEntity } from './entities/post.entity'
import { type IPostCommentModel } from './models/postCommentModel.model'
import { type IUpdatePostDto, type ICreatePostDto, type IPostCommentDto, type ICreatePostLikeDto } from './post.dto'

export interface IPostRepository {
  create: (createPostDto: ICreatePostDto, usersTaggedIds: string[]) => Promise<PostEntity>
  getById: (id: string) => Promise<PostEntity | null>
  update: (updatePostDto: IUpdatePostDto) => Promise<PostEntity | null>
  addComment: (comment: IPostCommentDto) => Promise<IPostCommentModel>
  addOrRemoveLike: ({ userId, postId }: ICreatePostLikeDto) => Promise<void>
  tagUserInAPost: (userId: string, postId: string) => Promise<void>
  delete: (id: string) => Promise<void>
}
