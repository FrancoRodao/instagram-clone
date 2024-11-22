import { Body, Controller, Delete, UseGuards } from '@nestjs/common'
import { type IControllerResponse } from '../../../shared/domain'
import { AuthorizationGuard } from '../../../shared/infrastructure/guards/authGuard'
import { DeletePost } from '../../application/deletePost.usecase'
import { DeletePostDto } from '../dtos/deletePostDto'
import { JwtUserPayload } from '../../../shared/infrastructure/decorators/jwtPayload.decorator'
import { IJwtUserPayload } from '../../../auth/domain'

@Controller('posts')
@UseGuards(AuthorizationGuard)
export class DeletePostController {
  constructor (
    private readonly deletePostUseCase: DeletePost
  ) {}

  @Delete()
  async execute (
    @Body() { postId }: DeletePostDto,
      @JwtUserPayload() { userId }: IJwtUserPayload
  ): Promise<IControllerResponse> {
    await this.deletePostUseCase.execute({ postId, userId })

    return {
      ok: true,
      // TODO: TRANSLATION
      msg: 'post deleted successfully'
    }
  }
}
