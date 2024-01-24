import { Module, type Provider } from '@nestjs/common'
import { LoggerService } from './loggerServiceImpl'
import { loggerDiTypes } from '../domain/loggerDiTypes'

const loggerProvider: Provider = {
  provide: loggerDiTypes.logger,
  useClass: LoggerService
}

@Module({
  providers: [loggerProvider],
  exports: [loggerProvider]
})
export class LoggerModule {}
