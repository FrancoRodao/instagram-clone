import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { type IController, type IControllerResponse } from '../../../shared/domain'
import { CreatePost } from '../../application'
import { CreatePostDto } from '../dtos/createPostDto'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('posts')
@UseGuards(AuthorizationGuard)
export class CreatePostController implements IController {
  constructor (
    private readonly createPostUseCase: CreatePost
  ) { }

  @Post()
  @UseInterceptors(FilesInterceptor('postMedia', 20))
  async execute (
    @Body() createPostDto: CreatePostDto,
      @UploadedFiles(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({
              maxSize: 20000000 // 20mb
            }),
            new FileTypeValidator({
              fileType: '.(png|jpeg|jpg|mp4)'
            })
          ]
        })
      )
      postMedia: Express.Multer.File[]
  ): Promise<IControllerResponse> {
    if (
      createPostDto.usersTaggedIds === undefined ||
      createPostDto.usersTaggedIds === null
    ) {
      createPostDto.usersTaggedIds = []
    }

    // usersTaggedIds can be sended in form of a string
    if (typeof createPostDto.usersTaggedIds === 'string') {
      // transform string to array
      createPostDto.usersTaggedIds = [createPostDto.usersTaggedIds]
    }

    const buffersOfPostMedia = postMedia.map(media => ({ mediaBuffer: media.buffer }))
    const { userAuthorId, description: postDescription, usersTaggedIds } = createPostDto

    const createdPost = await this.createPostUseCase.execute(
      {
        userAuthorId,
        postDescription,
        postMedia: buffersOfPostMedia,
        usersTaggedIds
      }
    )

    return {
      ok: true,
      // TODO: TRANSLATION
      msg: 'post created successfully',
      post: createdPost
    }
  }
}
