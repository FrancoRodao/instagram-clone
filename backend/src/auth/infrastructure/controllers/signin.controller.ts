import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IAuthTokenService } from '../../domain'
import { IController, IControllerResponse } from '../../../shared/domain'
import { authDiTypes } from '../authDiTypes'
import { SignInUser } from '../../application'
import { SignInUserDto } from '../dtos/signInUserDto'

@Controller('auth/signin')
export class SignInController implements IController {
  constructor (
    private signInUseCase: SignInUser,
    @Inject(authDiTypes.AuthTokenService)
    private authTokenService: IAuthTokenService
  ) { }

  @Post()
  async execute (@Body() signInUserDto: SignInUserDto): Promise<IControllerResponse> {
    const user = await this.signInUseCase.execute(signInUserDto)
    const { accessToken, refreshToken } = await this.authTokenService.generateAuthToken(user)

    return {
      ok: true,
      msg: 'user logged in',
      user,
      accessToken,
      refreshToken
    }
  }
}
