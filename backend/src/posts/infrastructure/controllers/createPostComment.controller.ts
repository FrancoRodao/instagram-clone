import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { type IControllerResponse, type IController } from '../../../shared/domain'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { CreatePostComment } from '../../application/createPostComment.usecase'
import { CreatePostCommentDto } from '../dtos/createCommentDto'

@Controller('posts/comment')
@UseGuards(AuthorizationGuard)
export class CreatePostCommentController implements IController {
  constructor (
    private readonly createPostCommentUseCase: CreatePostComment
  ) { }

  @Post()
  async execute (
    @Body() createPostCommentDto: CreatePostCommentDto
  ): Promise<IControllerResponse> {
    const { userAuthorId, postId, commentBody } = createPostCommentDto
    const newComment = await this.createPostCommentUseCase.execute({
      userAuthorId,
      postId,
      commentBody
    })

    return {
      ok: true,
      // TODO: TRANSLATION
      msg: 'comment post created successfully',
      comment: newComment
    }
  }
}
