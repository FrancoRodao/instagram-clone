import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IUserRepository } from '../../users/domain'
import { type IPostRepository } from '../domain'

interface ITagUserInAPostUseCaseRequest {
  userId: string
  postId: string
}

export class TagUserInAPost implements IUseCase<ITagUserInAPostUseCaseRequest, void> {
  constructor (
    private readonly logger: ILogger,
    private readonly postsRepository: IPostRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute ({ userId, postId }: ITagUserInAPostUseCaseRequest): Promise<void> {
    await this.checkPostAndUserExists(userId, postId)

    await this.postsRepository.tagUserInAPost(
      userId,
      postId
    )
    this.logger.info(`TagUserInAPostUseCase use case executed the user ${userId} has been tagged in the ${postId} post`)
  }

  private async checkPostAndUserExists (userId: string, postId: string): Promise<void> {
    const existsPost = this.postsRepository.getById(postId)
    const existsUser = this.userRepository.getById(userId)

    const validations = await Promise.all([existsPost, existsUser])
    if (validations[0] === null || (validations[1] === null)) {
      // TODO: TRANSLATION
      throw new Exception(
        Errors.CommonErrors.VALIDATION_ERROR,
        statusCodeError.BAD_REQUEST,
        // TODO: TRANSLATE
        "user or post doesn't exists"
      )
    }
  }
}
