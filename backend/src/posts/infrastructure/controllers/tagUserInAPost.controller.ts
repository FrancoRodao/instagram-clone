import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { type IControllerResponse, type IController } from '../../../shared/domain'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { TagUserInAPost } from '../../application/tagUserInPost.usecase'
import { TagUserInAPostDto } from '../dtos/tagUserInAPostDto'

@Controller('posts/tagUser')
@UseGuards(AuthorizationGuard)
export class TagUserInAPostController implements IController {
  constructor (
    private readonly tagUserInAPostUseCase: TagUserInAPost
  ) { }

  @Post()
  async execute (
    @Body() tagUserInAPostDto: TagUserInAPostDto
  ): Promise<IControllerResponse> {
    const { userId, postId } = tagUserInAPostDto
    await this.tagUserInAPostUseCase.execute({
      userId,
      postId
    })

    return {
      ok: true,
      // TODO: TRANSLATION
      msg: 'user tagged successfully'
    }
  }
}
