import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { environment } from '../config/environment.config'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter'
import { ValidationExceptionWrapper } from './validationExceptionWrapper'

export async function startServer () {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const errorsFormatted = errors.map((error) => ({
        [error.property]: error.constraints
      }))
      return new ValidationExceptionWrapper(errorsFormatted)
    }
  }))

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(environment('port'))
}
