import { IsUUID } from 'class-validator'

export class GetPostDto {
  @IsUUID(4)
    postId!: string
}
