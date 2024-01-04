import { Module } from '@nestjs/common'
import { UsersModule } from '../../../users/infrastructure'
import { AuthModule } from '../../../auth/infrastructure'

@Module({
  imports: [UsersModule, AuthModule]
})
export class AppModule {}
