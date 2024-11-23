import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { AuthModule } from '../../auth/infrastructure/auth.module'
import { UsersModule } from '../../users/infrastructure/users.module'
import { I18NModule } from '../../shared/services/i18n/infrastructure/i18n.module'
import { I18NMiddleware } from '../services/i18n/infrastructure/i18n.middleware'
import { PostsModule } from '../../posts/infrastructure/posts.module'
@Module({
  imports: [AuthModule, I18NModule, UsersModule, PostsModule]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(I18NMiddleware)
      .forRoutes('*')
  }
}
