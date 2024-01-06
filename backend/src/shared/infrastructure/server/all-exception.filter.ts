import { Response } from 'express'
import { HttpAdapterHost } from '@nestjs/core'
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Exception } from '../../domain'
import { ILogger } from '../../../logger/domain'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'

interface IErrorResponseBody{
  ok: boolean,
  statusCode: number,
  msg: Object
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor (
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: ILogger
  ) { }

  catch (exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let responseBody: IErrorResponseBody
    let status: number

    if (exception instanceof Exception) {
      status = exception.statusCodeError
      responseBody = {
        ok: false,
        statusCode: status,
        msg: exception.descriptionToUser
      }

      return httpAdapter.reply(response, responseBody, status)
    }

    if (exception instanceof ValidationExceptionWrapper) {
      status = exception.getStatus()
      responseBody = {
        ok: false,
        statusCode: status,
        msg: exception.errors
      }

      return httpAdapter.reply(response, responseBody, status)
    }

    // unexpected error
    status = 500
    responseBody = {
      ok: false,
      statusCode: status,
      // TODO: TRANSLATION
      msg: 'Unexpected error'
    }

    if (exception instanceof Error) {
      this.logger.error('Unexpected error', {
        ...exception,
        stack: exception.stack || 'failed to get error stack'
      })
    } else {
      this.logger.error('Unexpected error', { info: 'exception is not an instance of error' })
    }

    return httpAdapter.reply(response, responseBody, status)
  }
}
