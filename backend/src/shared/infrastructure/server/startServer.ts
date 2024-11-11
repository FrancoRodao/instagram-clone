import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from '../app.module'
import { environment } from '../config/environment.config'
import { AllExceptionFilter } from '../all-exception.filter'
import { ValidationExceptionWrapper } from '../validationExceptionWrapper'
import { loggerDiTypes } from '../../../shared/services/logger/domain'
import { i18nDiTypes } from '../../../shared/services/i18n/infrastructure/i18nDiTypes'

export async function startAPIServer (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const errorsFormatted = errors.map((error) => ({
        [error.property]: error.constraints
      }))

      return new ValidationExceptionWrapper(errorsFormatted)
    }
  }))

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, app.get(loggerDiTypes.Logger), app.get(i18nDiTypes.I18N)))

  await app.listen(environment('port'))
}
