import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IUserRepository } from '../../users/domain'
import { type IPostRepository } from '../domain/postRepository.interface'

export interface IDeletePostUseCaseRequest {
  postId: string
  userId: string
}

export class DeletePost implements IUseCase<IDeletePostUseCaseRequest, void> {
  constructor (
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly postRepository: IPostRepository
  ) {}

  async execute ({ userId, postId }: IDeletePostUseCaseRequest): Promise<void> {
    await this.checkPostAndUserExists(userId, postId)

    const user = await this.userRepository.getById(userId)
    const post = await this.postRepository.getById(postId)

    // only user post author, mod or admin can delete posts
    if (
      post?.userAuthorId === userId ||
      user?.role === 'MODERATOR' ||
      user?.role === 'ADMIN'
    ) {
      await this.postRepository.delete(postId)
    } else {
      throw new Exception(
        Errors.CommonErrors.INSUFFICIENT_PERMISSIONS,
        statusCodeError.FORBIDDEN,
        // TODO: TRANSLATE
        'INSUFFICIENT_PERMISSIONS'
      )
    }

    this.logger.info(`DeletePost use case executed the post ${postId} have been deleted.`)
  }

  // TODO: FIX DUPLICATION?
  private async checkPostAndUserExists (userId: string, postId: string): Promise<void> {
    const existsUser = this.userRepository.getById(userId)
    const existsPost = this.postRepository.getById(postId)
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
