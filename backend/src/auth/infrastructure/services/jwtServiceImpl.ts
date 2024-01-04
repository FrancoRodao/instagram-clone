import jwt from 'jsonwebtoken'
import { IJwtService, IJwtServicePayload } from '../../domain/services/jwtService.interface'

export class JwtService implements IJwtService {
  verifyToken (token: string, secretKey: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err || !decoded) reject(err)

        if (decoded) resolve(decoded)
      })
    })
  }

  createToken (payload: IJwtServicePayload, secret: string, expiresIn: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(
        { payload },
        secret,
        { expiresIn },
        (err, accessToken) => {
          if (err || !accessToken) reject(err)

          if (accessToken) resolve(accessToken)
        }
      )
    })
  }
}
