import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IPostDto } from '../domain/post.dto'
import { type IPostRepository } from '../domain/postRepository.interface'

interface IGetPostUseCaseRequest {
  postId: string
}

export class GetPost implements IUseCase<IGetPostUseCaseRequest, IPostDto> {
  constructor (
    private readonly logger: ILogger,
    private readonly postsRepository: IPostRepository
  ) {}

  async execute ({ postId }: IGetPostUseCaseRequest): Promise<IPostDto> {
    const post = await this.postsRepository.getById(postId)

    if (post === null) {
      throw new Exception(
        Errors.CommonErrors.VALIDATION_ERROR,
        statusCodeError.BAD_REQUEST,
        // TODO: TRANSLATE
        "post doesn't exists"
      )
    }

    this.logger.info(`GetPost use case executed: Post ${postId} retrieved.`)

    return post.transformToPostDto()
  }
}
