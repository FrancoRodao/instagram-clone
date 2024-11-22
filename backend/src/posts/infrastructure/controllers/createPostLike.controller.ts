import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { type IControllerResponse, type IController } from '../../../shared/domain'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { CreatePostLike } from '../../application/createPostLike.usecase'
import { CreatePostLikeDto } from '../dtos/createLIkeDto'

@Controller('posts/likes')
@UseGuards(AuthorizationGuard)
export class CreatePostLikeController implements IController {
  constructor (
    private readonly createPostLikeUseCase: CreatePostLike
  ) {}

  @Post()
  async execute (@Body() cratePostLikeDto: CreatePostLikeDto): Promise<IControllerResponse> {
    await this.createPostLikeUseCase.execute(cratePostLikeDto)

    return {
      ok: true,
      msg: 'like created successfully'
    }
  }
}
