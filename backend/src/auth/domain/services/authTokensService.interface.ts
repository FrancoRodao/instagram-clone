export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export type generateAuthTokenResponse = Promise<AuthTokens>

export interface IAuthTokenService {
  generateAuthToken: (userId: string) => generateAuthTokenResponse
}
