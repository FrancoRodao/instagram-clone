import { Optional } from '../../types'
import { IUserModel } from './user.model'

type IUserWithOutRole = Omit<IUserModel, 'role'>
export type IUserDTO = Optional<IUserWithOutRole, 'id'>
