import { IsOptional, IsString, IsUUID } from 'class-validator'
import { type ICreatePostDto } from '../../domain'

export class CreatePostDto implements Omit<ICreatePostDto, 'mediaURLs'> {
  @IsUUID(4)
    userAuthorId!: string

  @IsString()
    description!: string

  @IsOptional()
  @IsUUID(4, { each: true })
    usersTaggedIds!: string[]
}
