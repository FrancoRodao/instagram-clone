import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IAuthTokenService } from '../../domain'
import { SignUpUser } from '../../application'
import { CreateUserDto } from '../dtos/createUserDto'
import { authDiTypes } from '../authDiTypes'
import { IController, IControllerResponse } from '../../../shared/domain'
import { I18NService } from '../../../i18n/domain'
import { i18nDiTypes } from '../../../i18n/infrastructure'

@Controller('auth/signup')
export class SignUpController implements IController {
  constructor (
    private signUpUseCase: SignUpUser,
    @Inject(authDiTypes.AuthTokenService)
    private authTokenService: IAuthTokenService,
    @Inject(i18nDiTypes.I18N)
    private I18NService: I18NService
  ) { }

  @Post()
  async execute (@Body() createUserDto: CreateUserDto): Promise<IControllerResponse> {
    const user = await this.signUpUseCase.execute(createUserDto)
    const { accessToken, refreshToken } = await this.authTokenService.generateAuthToken(user)

    return {
      ok: true,
      msg: this.I18NService.translate('UserRegistered'),
      user,
      accessToken,
      refreshToken
    }
  }
}
