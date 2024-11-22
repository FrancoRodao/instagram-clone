import { Body, Controller, Get, UseGuards } from '@nestjs/common'
import { type IController, type IControllerResponse } from '../../../shared/domain'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { GetPost } from '../../application/getPost.usecase'
import { GetPostDto } from '../dtos/getPostDto'

@Controller('posts')
@UseGuards(AuthorizationGuard)
export class GetPostController implements IController {
  constructor (
    private readonly getPostUseCase: GetPost
  ) { }

  @Get()
  async execute (
    @Body() getPostDto: GetPostDto
  ): Promise<IControllerResponse> {
    const postFound = await this.getPostUseCase.execute(
      {
        postId: getPostDto.postId
      }
    )

    return {
      ok: true,
      // TODO: TRANSLATION
      msg: 'post retrieved successfully',
      post: postFound
    }
  }
}
