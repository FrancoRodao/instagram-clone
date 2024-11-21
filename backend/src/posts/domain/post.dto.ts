import { type PartialExcept, type Optional } from '../../types'
import { type IPostModel } from './models/post.model'
import { type IPostCommentModel } from './models/postCommentModel.model'
import { type IPostLikeModel } from './models/postLike.model'

export type IPostDto = Optional<
IPostModel,
'comments' | 'description' | 'id' | 'usersTagged' | 'likes'
>
export type ICreatePostDto = Omit<
IPostModel, 'comments' | 'likes' | 'id' | 'usersTagged'
>

export type IPostCommentDto = Omit<
IPostCommentModel, 'commentId' | 'user'
>
export type ICreatePostCommentDto = Omit<
IPostCommentModel, 'commentId' | 'user'
>
export type ICreatePostLikeDto = IPostLikeModel

type IUpdatePostAttributes = Pick<
IPostModel,
'id' | 'comments' | 'description' | 'usersTagged' | 'likes'
>

// all IUpdatePostAttributes fields are optional except id
export type IUpdatePostDto = PartialExcept<IUpdatePostAttributes, 'id'>
