import { IEncryptService } from '../domain'
import { Exception, Errors, IUseCase, statusCodeError } from '../../shared/domain'
import { IUserDto, IUserRepository } from '../../users/domain'

export class SignUpUser implements IUseCase<IUserDto, IUserDto> {
  constructor (
    private userRepository: IUserRepository,
    private encryptService: IEncryptService
  ) {}

  async execute (userDto: IUserDto): Promise<IUserDto> {
    const userEmailExists = await this.userRepository
      .getByEmail(userDto.email)

    if (userEmailExists) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        'El email del usuario ya esta registrado'
      )
    }

    const userUsernameExists = await this.userRepository
      .getByUsername(userDto.username)

    if (userUsernameExists) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        'El nombre de usuario ya esta registrado'
      )
    }

    const encryptedPassword = await this.encryptService.hash(userDto.password)
    const newUser = await this.userRepository.create({
      ...userDto,
      password: encryptedPassword
    })

    // TODO: LOGGER: USER REGISTERED

    return newUser.transformToUserDto()
  }
}
