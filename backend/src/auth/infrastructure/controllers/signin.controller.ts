import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IAuthTokenService } from '../../domain'
import { type IController, type IControllerResponse } from '../../../shared/domain'
import { authDiTypes } from '../authDiTypes'
import { SignInUser } from '../../application'
import { SignInUserDto } from '../dtos/signInUserDto'
import { I18NService } from '../../../shared/services/i18n/domain'
import { i18nDiTypes } from '../../../shared/services/i18n/infrastructure/i18nDiTypes'

@Controller('auth/signin')
export class SignInController implements IController {
  constructor (
    private readonly signInUseCase: SignInUser,
    @Inject(authDiTypes.AuthTokenService)
    private readonly authTokenService: IAuthTokenService,
    @Inject(i18nDiTypes.I18N)
    private readonly _I18NService: I18NService
  ) { }

  @Post()
  async execute (@Body() signInUserDto: SignInUserDto): Promise<IControllerResponse> {
    const userDTO = await this.signInUseCase.execute(signInUserDto)

    const { accessToken, refreshToken } = await this.authTokenService.generateAuthToken(userDTO.id)

    return {
      ok: true,
      // TODO: TRANSLATE
      msg: 'user logged in',
      user: userDTO,
      accessToken,
      refreshToken
    }
  }
}
