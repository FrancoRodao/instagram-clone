import { IUserDto } from '../../users/domain'

export type ISignInUserDto = Pick<IUserDto, 'email' | 'password'>
