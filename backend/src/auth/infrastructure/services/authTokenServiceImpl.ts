import { Inject } from '@nestjs/common'
import { type IAuthTokenService, IJwtService, type generateAuthTokenResponse } from '../../domain'
import { authDiTypes } from '../authDiTypes'

export class AuthTokenService implements IAuthTokenService {
  constructor (
    @Inject(authDiTypes.JwtService)
    private readonly jwtService: IJwtService
  ) {}

  async generateAuthToken (userId: string): generateAuthTokenResponse {
    const [accessToken, refreshToken] = await this.generateAsyncAuthToken(userId)

    return {
      accessToken,
      refreshToken
    }
  }

  private async generateAsyncAuthToken (userId: string): Promise<[string, string]> {
    const accessToken = this.jwtService.createToken({ userId }, '5m')

    const refreshToken = this.jwtService.createToken({ userId }, '30d')

    return await Promise.all([accessToken, refreshToken])
  }
}
