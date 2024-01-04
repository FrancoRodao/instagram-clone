import { IsString, IsEmail } from 'class-validator'
import { ISignInUserDto } from '../../domain/signInUser.dto'

// TODO: TRANSLATIONS
export class SignInUserDto implements ISignInUserDto {
    @IsEmail({}, {
      message: 'Invalid email'
    })
      email!: string

    @IsString()
      password!: string
}
