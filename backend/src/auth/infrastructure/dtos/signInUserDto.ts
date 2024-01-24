import { IsString, IsEmail } from 'class-validator'
import { ISignInUserDto } from '../../domain/signInUser.dto'

export class SignInUserDto implements ISignInUserDto {
    @IsEmail({}, {
      message: 'Invalid email'
    })
      email!: string

    @IsString()
      password!: string
}
