import { type IEncryptService } from '../domain'
import { Exception, Errors, type IUseCase, statusCodeError } from '../../shared/domain'
import { type IUserDto, type IUserRepository } from '../../users/domain'
import { type ILogger } from '../../logger/domain'
import { type I18NService } from '../../i18n/domain'

export class SignUpUser implements IUseCase<IUserDto, IUserDto> {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptService: IEncryptService,
    private readonly logger: ILogger,
    private readonly I18NService: I18NService
  ) {}

  async execute (userDto: IUserDto): Promise<IUserDto> {
    const userEmailExists = await this.userRepository
      .getByEmail(userDto.email)

    if (userEmailExists != null) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.EmailIsAlreadyRegistered')
      )
    }

    const userUsernameExists = await this.userRepository
      .getByUsername(userDto.username)

    if (userUsernameExists != null) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        this.I18NService.translate('errors.UsernameIsAlreadyRegistered')
      )
    }

    const encryptedPassword = await this.encryptService.hash(userDto.password)
    const newUser = await this.userRepository.create({
      ...userDto,
      password: encryptedPassword
    })

    this.logger.info(`SignUpUser use case executed the user ${newUser.username} have been registered.`)

    return newUser.transformToUserDto()
  }
}
