import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IUploadMediaService } from '../../shared/services/uploadMedia/domain/uploadMediaService.interface'
import { type IUserRepository } from '../../users/domain'
import { type IPostDto } from '../domain/post.dto'
import { type IPostRepository } from '../domain/postRepository.interface'

interface ICreatePostUseCaseRequest {
  userAuthorId: string
  postDescription: string
  postMedia: Array<{ mediaBuffer: Buffer }>
  usersTaggedIds: string[]
}

export class CreatePost implements IUseCase<ICreatePostUseCaseRequest, IPostDto> {
  constructor (
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly postRepository: IPostRepository,
    private readonly uploadMediaService: IUploadMediaService
  ) {}

  async execute (
    {
      userAuthorId,
      postDescription,
      postMedia,
      usersTaggedIds
    }: ICreatePostUseCaseRequest
  ): Promise<IPostDto> {
    await this.checkUserExists(userAuthorId)

    const uploadPostMediaPromises = postMedia.map(
      async (postMedia) => await this.uploadMediaService.upload(postMedia.mediaBuffer)
    )
    const postMediaUploaded = await Promise.all(uploadPostMediaPromises)
    const mediaURLs = postMediaUploaded.map(media => media.url)

    const newPost = await this.postRepository.create(
      {
        userAuthorId,
        description: postDescription,
        mediaURLs
      },
      usersTaggedIds
    )

    this.logger.info(`CreatePost use case executed the post ${newPost.id} have been created.`)

    return newPost.transformToPostDto()
  }

  private async checkUserExists (userId: string): Promise<void> {
    const existsUser = await this.userRepository.getById(userId)

    if (existsUser === null) {
      // TODO: TRANSLATION
      throw new Exception(
        Errors.CommonErrors.VALIDATION_ERROR,
        statusCodeError.BAD_REQUEST,
        // TODO: TRANSLATE
        "user doesn't exists"
      )
    }
  }
}
