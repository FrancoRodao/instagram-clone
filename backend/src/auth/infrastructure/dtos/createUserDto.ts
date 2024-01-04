import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator'
import { IUserDto } from '../../../users/domain'

// TODO: TRANSLATIONS
export class CreateUserDto implements IUserDto {
    @MinLength(5, {
      message: 'fullName Must Have At Least 5 Characters '
    })
    @IsString()
      fullName!: string

    @Min(13, {
      message: 'You must be at least 12 years old'
    })
    @IsNumber()
      age!: number

    @IsEmail()
      email!: string

    @MinLength(8, {
      message: 'password Must Have At Least 8 Characters '
    })
      password!: string

    @MinLength(3, {
      message: 'username Must Have At Least 5 Characters '
    })
      username!: string

    biography?: string
    profilePicture?: string
}
