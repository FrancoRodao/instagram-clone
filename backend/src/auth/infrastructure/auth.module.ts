import { Module, Provider } from '@nestjs/common'
import { IEncryptService } from '../domain'
import { SignInUser, SignUpUser } from '../application'
import { IUserRepository } from '../../users/domain'
import { UsersModule, usersDiTypes } from '../../users/infrastructure'
import { AuthTokenService } from './services/authTokenServiceImpl'
import { JwtService } from './services/jwtServiceImpl'
import { EncryptService } from './services/encryptServiceImpl'
import { SignUpController } from './controllers/signup.controller'
import { SignInController } from './controllers/signin.controller'
import { authDiTypes } from './authDiTypes'
import { ILogger, loggerDiTypes } from '../../logger/domain'
import { LoggerModule } from '../../logger/infrastructure'

const SignInUserProvider: Provider = {
  provide: SignInUser,
  useFactory: (userRepository: IUserRepository, encryptService: IEncryptService, loggerService: ILogger) =>
    new SignInUser(userRepository, encryptService, loggerService),
  inject: [
    { token: usersDiTypes.UserRepository, optional: false },
    { token: authDiTypes.EncryptService, optional: false },
    { token: loggerDiTypes.logger, optional: false }
  ]
}

const SignUpUserProvider: Provider = {
  provide: SignUpUser,
  useFactory: (userRepository: IUserRepository, encryptService: IEncryptService, loggerService: ILogger) =>
    new SignUpUser(userRepository, encryptService, loggerService),
  inject: [
    { token: usersDiTypes.UserRepository, optional: false },
    { token: authDiTypes.EncryptService, optional: false },
    { token: loggerDiTypes.logger, optional: false }
  ]
}

const EncryptServiceProvider: Provider = {
  provide: authDiTypes.EncryptService,
  useClass: EncryptService
}

const JwtServiceProvider: Provider = {
  provide: authDiTypes.JwtService,
  useClass: JwtService
}

const AuthTokenServiceProvider: Provider = {
  provide: authDiTypes.AuthTokenService,
  useClass: AuthTokenService
}

@Module({
  providers: [
    SignUpUserProvider, SignInUserProvider, AuthTokenService,
    JwtServiceProvider, EncryptServiceProvider,
    AuthTokenServiceProvider
  ],
  controllers: [SignUpController, SignInController],
  imports: [UsersModule, LoggerModule]
})
export class AuthModule {}
