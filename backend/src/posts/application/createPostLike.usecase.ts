import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IUserRepository } from '../../users/domain'
import { type IPostRepository } from '../domain'

export interface ICreatePostLikeUseCaseRequest {
  postId: string
  userId: string
}

export class CreatePostLike implements IUseCase<ICreatePostLikeUseCaseRequest, void> {
  constructor (
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly postRepository: IPostRepository
  ) { }

  async execute ({ userId, postId }: ICreatePostLikeUseCaseRequest): Promise<void> {
    await this.checkPostAndUserExists(userId, postId)

    await this.postRepository.addOrRemoveLike({
      postId,
      userId
    })

    this.logger.info(`CreateLikePost use case executed the user ${userId}  liked the post ${postId}`)
  }

  private async checkPostAndUserExists (userId: string, postId: string): Promise<void> {
    const existsPost = this.postRepository.getById(postId)
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
