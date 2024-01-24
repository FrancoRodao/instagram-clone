import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { i18nDiTypes } from './i18nDiTypes'
import { I18NService } from '../domain'
import { Errors, Exception, isProductionENV, statusCodeError } from '../../shared/domain'

@Injectable()
export class I18NMiddleware implements NestMiddleware {
  constructor (
    @Inject(i18nDiTypes.I18N) private I18NService: I18NService
  ) {}

  use (req: Request, res: Response, next: NextFunction) {
    const acceptLanguageHeader = req.headers['accept-language'] as string

    if (typeof acceptLanguageHeader !== 'string' || !acceptLanguageHeader) {
      throw new Exception(
        Errors.TRANSLATION_ERROR,
        statusCodeError.BAD_REQUEST,
        isProductionENV
          ? this.I18NService.translate('errors.TranslationError')
          : 'accept-language header must be a string'
      )
    }

    if (!this.I18NService.isAvailableLanguage(acceptLanguageHeader)) {
      throw new Exception(
        Errors.TRANSLATION_ERROR,
        statusCodeError.BAD_REQUEST,
        isProductionENV
          ? this.I18NService.translate('errors.TranslationError')
          : 'accept-language must be a valid language'
      )
    }

    // acceptLanguageHeader is a available language
    // @ts-expect-error
    this.I18NService.changeLanguage(acceptLanguageHeader)

    next()
  }
}
