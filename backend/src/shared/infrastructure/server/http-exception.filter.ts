import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { Exception } from '../../domain'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    // TODO: INJECT LOGGER
    // logger.error(exception.stack || 'failed to get error stack')

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    if (exception instanceof Exception) {
      return response
        .status(exception.statusCodeError)
        .json({
          ok: false,
          statusCode: exception.statusCodeError,
          // TODO: TRANSLATION
          msg: exception.codeError
        })
    }

    if (exception instanceof ValidationExceptionWrapper) {
      return response
        .status(status)
        .json({
          ok: false,
          statusCode: status,
          msg: exception.errors
        })
    }

    return response
      .status(status)
      .json({
        ok: false,
        statusCode: status,
        msg: exception.getResponse()
      })
  }
}
