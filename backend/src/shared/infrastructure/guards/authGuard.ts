import { type Request } from 'express'
import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common'
import { IJwtService } from '../../../auth/domain/services/jwtService.interface'
import { authDiTypes } from '../../../auth/infrastructure/authDiTypes'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor (
    @Inject(authDiTypes.JwtService)
    private readonly jwtService: IJwtService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const token = this.jwtService.extractJwtFromHttpHeaders(request.headers.authorization)

    if (await this.jwtService.isValidToken(token)) {
      request.userPayload = await this.jwtService.decodeToken(token)
      return true
    }

    // TODO: SEND MESSAGE INVALID TOKEN
    throw new UnauthorizedException()
  }
}
