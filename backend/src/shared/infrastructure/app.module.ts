import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersModule } from '../../users/infrastructure'
import { AuthModule } from '../../auth/infrastructure'
import { I18NMiddleware } from '../../i18n/infrastructure/i18n.middleware'
import { I18NModule } from '../../i18n/infrastructure/i18n.module'

@Module({
  imports: [I18NModule, UsersModule, AuthModule]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(I18NMiddleware)
      .forRoutes('*')
  }
}
