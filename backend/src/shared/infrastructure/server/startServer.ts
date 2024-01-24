import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from '../app.module'
import { environment } from '../config/environment.config'
import { AllExceptionFilter } from '../all-exception.filter'
import { ValidationExceptionWrapper } from '../validationExceptionWrapper'
import { loggerDiTypes } from '../../../logger/domain'
import { i18nDiTypes } from '../../../i18n/infrastructure'

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
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, app.get(loggerDiTypes.logger), app.get(i18nDiTypes.I18N)))

  await app.listen(environment('port'))
}
