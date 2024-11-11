import { type Response } from 'express'
import { HttpAdapterHost } from '@nestjs/core'
import { type ExceptionFilter, Catch, type ArgumentsHost, Inject } from '@nestjs/common'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'
import { Exception } from '../domain'
import { ILogger, loggerDiTypes } from '../../shared/services/logger/domain'
import { I18NService as I18NServiceAbstract } from '../../shared/services/i18n/domain'
import { i18nDiTypes } from '../../shared/services/i18n/infrastructure/i18nDiTypes'

interface IErrorResponseBody {
  ok: boolean
  statusCode: number
  msg: unknown
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor (
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(loggerDiTypes.Logger) private readonly logger: ILogger,
    @Inject(i18nDiTypes.I18N) private readonly I18NService: I18NServiceAbstract
  ) { }

  catch (exception: unknown, host: ArgumentsHost): any {
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
        stack: exception.stack ?? 'failed to get error stack'
      })
    } else {
      this.logger.error('Unexpected error', { info: 'exception is not an instance of error' })
    }

    return httpAdapter.reply(response, responseBody, status)
  }
}
