import { Response } from 'express'
import { HttpAdapterHost } from '@nestjs/core'
import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'
import { Exception } from '../domain'
import { ILogger, loggerDiTypes } from '../../logger/domain'
import { I18NService } from '../../i18n/domain'
import { i18nDiTypes } from '../../i18n/infrastructure'

interface IErrorResponseBody{
  ok: boolean,
  statusCode: number,
  msg: Object
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor (
    private httpAdapterHost: HttpAdapterHost,
    @Inject(loggerDiTypes.logger) private logger: ILogger,
    @Inject(i18nDiTypes.I18N) private I18NService: I18NService
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
      msg: this.I18NService.translate('errors.UnexpectedError')
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
