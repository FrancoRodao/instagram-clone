import { type ILogger } from '../../shared/services/logger/domain'
import { Errors, Exception, statusCodeError, type IUseCase } from '../../shared/domain'
import { type IUserRepository } from '../../users/domain'
import { type IPostRepository, type IPostCommentDto } from '../domain'

interface ICreateCommentUseCaseRequest {
  userAuthorId: string
  postId: string
  commentBody: string
}

export class CreatePostComment implements IUseCase<ICreateCommentUseCaseRequest, IPostCommentDto> {
  constructor (
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly postRepository: IPostRepository
  ) {}

  async execute ({ userAuthorId, postId, commentBody }: ICreateCommentUseCaseRequest): Promise<IPostCommentDto> {
    await this.checkPostAndUserExists(userAuthorId, postId)

    const newComment = await this.postRepository.addComment({
      userAuthorId,
      postId,
      commentBody
    })

    this.logger.info(`CreatePostComment use case executed the comment ${newComment.commentId} have been created.`)

    return {
      userAuthorId,
      postId,
      commentBody
    }
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
