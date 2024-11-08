import { type IEncryptService } from '../domain'
import { Exception, Errors, type IUseCase, statusCodeError } from '../../shared/domain'
import { type IUserDto, type IUserCreateAttributes, type IUserRepository } from '../../users/domain'
import { type ILogger } from '../../shared/services/logger/domain'
import { type I18NService } from '../../shared/services/i18n/domain'

export class SignUpUser implements IUseCase<IUserCreateAttributes, IUserDto> {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptService: IEncryptService,
    private readonly logger: ILogger,
    private readonly I18NService: I18NService
  ) {}

  async execute (createUserDto: IUserCreateAttributes): Promise<IUserDto> {
    const userEmailExists = await this.userRepository
      .getByEmail(createUserDto.email)

    if (userEmailExists != null) {
      throw new Exception(
        Errors.AuthErrors.INVALID_CREDENTIALS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.EmailIsAlreadyRegistered')
      )
    }

    const userUsernameExists = await this.userRepository
      .getByUsername(createUserDto.username)

    if (userUsernameExists != null) {
      throw new Exception(
        Errors.CommonErrors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.UsernameIsAlreadyRegistered')
      )
    }

    const encryptedPassword = await this.encryptService.hash(createUserDto.password)
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: encryptedPassword
    })

    this.logger.info(`SignUpUser use case executed the user ${newUser.username} have been registered.`)

    return newUser.transformToUserDto()
  }
}
