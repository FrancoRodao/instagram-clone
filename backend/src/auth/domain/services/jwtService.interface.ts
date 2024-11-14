export interface IJwtUserPayload {
  userId: string
}

export type IJwtPayload = IJwtUserPayload & Record<string, string>

export interface IJwtService {
  extractJwtFromHttpHeaders: (authorizationHeaderValue: string | undefined | null) => string
  isValidToken: (token: string) => Promise<boolean>
  decodeToken: (token: string) => Promise<IJwtPayload>
  createToken: (payload: IJwtPayload, expiresIn: string) => Promise<string>
}
