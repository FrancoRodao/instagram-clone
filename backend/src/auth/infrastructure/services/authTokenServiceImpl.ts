import { Inject } from '@nestjs/common'
import { IAuthTokenService, IJwtService, generateAuthTokenResponse } from '../../domain'
import { IUserDto } from '../../../users/domain'
import { environment } from '../../../shared/infrastructure'
import { authDiTypes } from '../authDiTypes'

export class AuthTokenService implements IAuthTokenService {
  constructor (
    @Inject(authDiTypes.JwtService)
    private jwtService: IJwtService
  ) {}

  async generateAuthToken (userDto: IUserDto): generateAuthTokenResponse {
    const [accessToken, refreshToken] = await this.generateAsyncAuthToken(userDto)

    return {
      accessToken,
      refreshToken
    }
  }

  private generateAsyncAuthToken ({ username }: IUserDto): Promise<[string, string]> {
    const accessToken = this.jwtService.createToken({ username }, environment('SECRET_KEY'), '5m')

    const refreshToken = this.jwtService.createToken({ username }, environment('SECRET_KEY'), '30d')

    return Promise.all([accessToken, refreshToken])
  }
}
