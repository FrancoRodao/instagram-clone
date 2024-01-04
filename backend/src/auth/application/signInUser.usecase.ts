import { Exception, Errors, IUseCase, statusCodeError } from '../../shared/domain'
import { IUserDto, IUserRepository } from '../../users/domain'
import { ISignInUserDto, IEncryptService } from '../domain'

export class SignInUser implements IUseCase<ISignInUserDto, IUserDto> {
  constructor (
        private userRepository: IUserRepository,
        private encryptService: IEncryptService
  ) { }

  async execute (userDto: ISignInUserDto): Promise<IUserDto> {
    const user = await this.userRepository
      .getByEmail(userDto.email)

    if (!user) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        'Las credenciales son incorrectas'
      )
    }

    const isCorrectPassword = this.encryptService.compare(userDto.password, user.password)

    if (!isCorrectPassword) {
      throw new Exception(
        Errors.FIELD_ALREADY_EXISTS,
        statusCodeError.BAD_REQUEST,
        'Las credenciales son incorrectas'
      )
    }

    // TODO: LOGGER: USER LOGGED IN

    return user.transformToUserDto()
  }
}
