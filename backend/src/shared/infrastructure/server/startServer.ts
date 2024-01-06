import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { environment } from '../config/environment.config'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionFilter } from './all-exception.filter'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'
import { loggerDiTypes } from '../../../logger/domain'

export async function startAPIServer () {
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
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, app.get(loggerDiTypes.logger)))

  await app.listen(environment('port'))
}
