import { IsUUID } from 'class-validator'

export class TagUserInAPostDto {
  @IsUUID(4)
    userId!: string

  @IsUUID(4)
    postId!: string
}
