import { type IUserDto } from '../../users/domain'

export type ISignInUserDto = Pick<IUserDto, 'email' | 'password'>
