import jwt from 'jsonwebtoken'
import { type IJwtService, type IJwtServicePayload } from '../../domain/services/jwtService.interface'

export class JwtService implements IJwtService {
  async verifyToken (token: string, secretKey: string): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if ((err != null) || decoded == null) reject(err)
        else resolve(decoded)
      })
    })
  }

  async createToken (payload: IJwtServicePayload, secret: string, expiresIn: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      jwt.sign(
        { payload },
        secret,
        { expiresIn },
        (err, accessToken) => {
          if ((err != null) || accessToken == null) reject(err)
          else resolve(accessToken)
        }
      )
    })
  }
}
