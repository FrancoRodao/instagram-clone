import { IsUUID } from 'class-validator'
import { type ICreatePostLikeDto } from '../../domain'

export class CreatePostLikeDto implements ICreatePostLikeDto {
  @IsUUID(4)
  readonly postId!: string

  @IsUUID(4)
  readonly userId!: string
}
