export interface IJwtServicePayload {
  username: string
}

export interface IJwtService {
  verifyToken: (token: string, secretKey: string) => Promise<unknown>
  createToken: (payload: IJwtServicePayload, secret: string, expiresIn: string) => Promise<string>
}
