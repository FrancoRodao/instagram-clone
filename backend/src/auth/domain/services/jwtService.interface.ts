export interface IJwtServicePayload {
  userId: string
}

export interface IJwtService {
  extractJwtFromHttpHeaders: (authorizationHeaderValue: string | undefined | null) => string
  isValidToken: (token: string) => Promise<boolean>
  decodeToken: (token: string) => Promise<IJwtServicePayload>
  createToken: (payload: IJwtServicePayload, expiresIn: string) => Promise<string>
}
