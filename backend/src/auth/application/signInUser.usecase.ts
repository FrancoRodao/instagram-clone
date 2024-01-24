import { I18NService } from '../../i18n/domain'
import { ILogger } from '../../logger/domain'
import { Exception, Errors, IUseCase, statusCodeError } from '../../shared/domain'
import { IUserDto, IUserRepository } from '../../users/domain'
import { ISignInUserDto, IEncryptService } from '../domain'

export class SignInUser implements IUseCase<ISignInUserDto, IUserDto> {
  constructor (
        private userRepository: IUserRepository,
        private encryptService: IEncryptService,
        private logger: ILogger,
        private I18NService: I18NService
  ) { }

  async execute (userDto: ISignInUserDto): Promise<IUserDto> {
    const user = await this.userRepository
      .getByEmail(userDto.email)

    if (!user) {
      throw new Exception(
        Errors.INVALID_CREDENTIALS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.InvalidUserCredentials')
      )
    }

    const isCorrectPassword = this.encryptService.compare(userDto.password, user.password)

    if (!isCorrectPassword) {
      throw new Exception(
        Errors.INVALID_CREDENTIALS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.InvalidUserCredentials')
      )
    }

    this.logger.info(`SignInUser use case executed the user ${user.username} have been logged.`)

    return user.transformToUserDto()
  }
}
