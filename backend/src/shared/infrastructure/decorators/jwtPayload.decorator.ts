import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const JwtUserPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    // userPayload is setted in AuthorizationGuard
    return request.userPayload
  }
)
