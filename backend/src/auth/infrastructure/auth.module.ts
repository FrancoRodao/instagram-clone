import { Module, type Provider } from '@nestjs/common'
import { type IEncryptService } from '../domain/services/encryptService.interface'
import { SignInUser } from '../application/signInUser.usecase'
import { type IUserRepository } from '../../users/domain'
import { UsersModule } from '../../users/infrastructure/users.module'
import { AuthTokenService } from './services/authTokenServiceImpl'
import { JwtService } from './services/jwtServiceImpl'
import { EncryptService } from './services/encryptServiceImpl'
import { SignUpController } from './controllers/signup.controller'
import { SignInController } from './controllers/signin.controller'
import { authDiTypes } from './authDiTypes'
import { type ILogger, loggerDiTypes } from '../../shared/services/logger/domain'
import { LoggerModule } from '../../shared/services/logger/infrastructure'
import { I18NModule, i18nDiTypes } from '../../shared/services/i18n/infrastructure'
import { type I18NService } from '../../shared/services/i18n/domain'
import { usersDiTypes } from '../../users/infrastructure/usersDiTypes'
import { SignUpUser } from '../application/signUpUser.usecase'

const SignInUserProvider: Provider = {
  provide: SignInUser,
  useFactory: (userRepository: IUserRepository, encryptService: IEncryptService, loggerService: ILogger, i18nService: I18NService) =>
    new SignInUser(userRepository, encryptService, loggerService, i18nService),
  inject: [
    { token: usersDiTypes.UserRepository, optional: false },
    { token: authDiTypes.EncryptService, optional: false },
    { token: loggerDiTypes.Logger, optional: false },
    { token: i18nDiTypes.I18N, optional: false }
  ]
}

const SignUpUserProvider: Provider = {
  provide: SignUpUser,
  useFactory: (userRepository: IUserRepository, encryptService: IEncryptService, loggerService: ILogger, i18nService: I18NService) =>
    new SignUpUser(userRepository, encryptService, loggerService, i18nService),
  inject: [
    { token: usersDiTypes.UserRepository, optional: false },
    { token: authDiTypes.EncryptService, optional: false },
    { token: loggerDiTypes.Logger, optional: false },
    { token: i18nDiTypes.I18N, optional: false }
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
    SignUpUserProvider, SignInUserProvider,
    JwtServiceProvider, EncryptServiceProvider,
    AuthTokenServiceProvider
  ],
  controllers: [SignUpController, SignInController],
  imports: [I18NModule, UsersModule, LoggerModule],
  exports: [JwtServiceProvider]
})
export class AuthModule {}
