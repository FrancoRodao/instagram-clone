import { type IUserDto } from '../../../users/domain/user.dto'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export type generateAuthTokenResponse = Promise<AuthTokens>

export interface IAuthTokenService {
  generateAuthToken: (user: IUserDto) => generateAuthTokenResponse
}
