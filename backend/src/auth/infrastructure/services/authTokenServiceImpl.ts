import { Inject } from '@nestjs/common'
import { type IAuthTokenService, IJwtService, type generateAuthTokenResponse } from '../../domain'
import { type IUserDto } from '../../../users/domain'
import { environment } from '../../../shared/infrastructure'
import { authDiTypes } from '../authDiTypes'

export class AuthTokenService implements IAuthTokenService {
  constructor (
    @Inject(authDiTypes.JwtService)
    private readonly jwtService: IJwtService
  ) {}

  async generateAuthToken (userDto: IUserDto): generateAuthTokenResponse {
    const [accessToken, refreshToken] = await this.generateAsyncAuthToken(userDto)

    return {
      accessToken,
      refreshToken
    }
  }

  private async generateAsyncAuthToken ({ username }: IUserDto): Promise<[string, string]> {
    const accessToken = this.jwtService.createToken({ username }, environment('SECRET_KEY'), '5m')

    const refreshToken = this.jwtService.createToken({ username }, environment('SECRET_KEY'), '30d')

    return await Promise.all([accessToken, refreshToken])
  }
}
