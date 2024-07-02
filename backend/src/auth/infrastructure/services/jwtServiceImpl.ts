import jwt from 'jsonwebtoken'
import { type IJwtService, type IJwtServicePayload } from '../../domain/services/jwtService.interface'
import { environment } from '../../../shared/infrastructure'
import { Errors, Exception, statusCodeError } from '../../../shared/domain'

export class JwtService implements IJwtService {
  async isValidToken (token: string): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      jwt.verify(token, environment('SECRET_KEY'), (err, decoded) => {
        if ((err != null) || decoded == null) reject(err)
        else resolve(true)
      })
    })
  }

  async decodeToken (token: string): Promise<IJwtServicePayload> {
    return await new Promise<any>((resolve, reject) => {
      jwt.verify(token, environment('SECRET_KEY'), (err, decoded) => {
        if ((err != null) || decoded == null) reject(err)
        else resolve(decoded)
      })
    })
  }

  async createToken (payload: IJwtServicePayload, expiresIn: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      jwt.sign(
        { payload },
        environment('SECRET_KEY'),
        { expiresIn },
        (err, accessToken) => {
          if ((err != null) || accessToken == null) reject(err)
          else resolve(accessToken)
        }
      )
    })
  }

  extractJwtFromHttpHeaders (authorizationHeaderValue: string | null | undefined): string {
    if (
      authorizationHeaderValue !== undefined &&
      authorizationHeaderValue !== null
    ) {
      // format: bearer token
      const token = authorizationHeaderValue.split(' ')[1]
      return token
    }

    throw new Exception(
      Errors.AuthErrors.INVALID_AUTHORIZATION_TOKEN,
      statusCodeError.BAD_REQUEST,
      Errors.AuthErrors.INVALID_AUTHORIZATION_TOKEN
    )
  }
}
