import { type IUserCreateAttributes } from '../../users/domain'

export type ISignInUserDto = Pick<IUserCreateAttributes, 'email' | 'password'>
