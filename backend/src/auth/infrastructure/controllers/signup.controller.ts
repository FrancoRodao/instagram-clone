import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IAuthTokenService } from '../../domain'
import { SignUpUser } from '../../application'
import { CreateUserDto } from '../dtos/createUserDto'
import { authDiTypes } from '../authDiTypes'
import { type IController, type IControllerResponse } from '../../../shared/domain'
import { i18nDiTypes } from '../../../shared/services/i18n/infrastructure'
import { I18NService } from '../../../shared/services/i18n/domain'

@Controller('auth/signup')
export class SignUpController implements IController {
  constructor (
    private readonly signUpUseCase: SignUpUser,
    @Inject(authDiTypes.AuthTokenService)
    private readonly authTokenService: IAuthTokenService,
    @Inject(i18nDiTypes.I18N)
    private readonly _I18NService: I18NService
  ) { }

  @Post()
  async execute (@Body() createUserDto: CreateUserDto): Promise<IControllerResponse> {
    const user = await this.signUpUseCase.execute(createUserDto)

    const { accessToken, refreshToken } = await this.authTokenService.generateAuthToken(user.id)

    return {
      ok: true,
      msg: this._I18NService.translate('UserRegistered'),
      user,
      accessToken,
      refreshToken
    }
  }
}
