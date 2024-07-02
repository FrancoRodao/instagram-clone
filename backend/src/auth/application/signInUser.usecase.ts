import { type I18NService } from '../../i18n/domain'
import { type ILogger } from '../../logger/domain'
import { Exception, Errors, type IUseCase, statusCodeError } from '../../shared/domain'
import { type IUserDto, type IUserRepository } from '../../users/domain'
import { type ISignInUserDto, type IEncryptService } from '../domain'

interface ISignInUserUseCaseResponse {
  userDTO: IUserDto
  userId: string
}
export class SignInUser implements IUseCase<ISignInUserDto, ISignInUserUseCaseResponse> {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptService: IEncryptService,
    private readonly logger: ILogger,
    private readonly I18NService: I18NService
  ) { }

  async execute (userDto: ISignInUserDto): Promise<ISignInUserUseCaseResponse> {
    const user = await this.userRepository
      .getByEmail(userDto.email)

    if (user == null) {
      throw new Exception(
        Errors.AuthErrors.INVALID_AUTHORIZATION_TOKEN,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.InvalidUserCredentials')
      )
    }

    const isCorrectPassword = await this.encryptService.compare(userDto.password, user.password)

    if (!isCorrectPassword) {
      throw new Exception(
        Errors.AuthErrors.INVALID_CREDENTIALS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.InvalidUserCredentials')
      )
    }

    this.logger.info(`SignInUser use case executed the user ${user.username} have been logged.`)

    return {
      userDTO: user.transformToUserDto(),
      userId: user.id
    }
  }
}
