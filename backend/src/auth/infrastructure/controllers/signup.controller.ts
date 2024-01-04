import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IAuthTokenService } from '../../domain'
import { IController, IControllerResponse } from '../../../shared/domain'
import { SignUpUser } from '../../application'
import { CreateUserDto } from '../dtos/createUserDto'
import { authDiTypes } from '../authDiTypes'

@Controller('auth/signup')
export class SignUpController implements IController {
  constructor (
    private signUpUseCase: SignUpUser,
    @Inject(authDiTypes.AuthTokenService)
    private authTokenService: IAuthTokenService
  ) { }

  @Post()
  async execute (@Body() createUserDto: CreateUserDto): Promise<IControllerResponse> {
    const user = await this.signUpUseCase.execute(createUserDto)
    const { accessToken, refreshToken } = await this.authTokenService.generateAuthToken(user)

    return {
      ok: true,
      // TODO: translations
      msg: 'user created',
      user,
      accessToken,
      refreshToken
    }
  }
}
