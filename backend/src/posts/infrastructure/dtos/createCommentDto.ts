import { IsUUID, MinLength } from 'class-validator'
import { type ICreatePostCommentDto } from '../../domain'

export class CreatePostCommentDto implements ICreatePostCommentDto {
  @IsUUID(4)
    userAuthorId!: string

  @IsUUID(4)
    postId!: string

  @MinLength(1)
    commentBody!: string
}
