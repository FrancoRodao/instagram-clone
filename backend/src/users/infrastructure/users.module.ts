import { Module, type Provider } from '@nestjs/common'
import { SequelizeUserRepository } from './userRepositoryImpl'
import { usersDiTypes } from './usersDiTypes'

const UserRepository: Provider = {
  provide: usersDiTypes.UserRepository,
  useClass: SequelizeUserRepository
}

@Module({
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UsersModule {}
