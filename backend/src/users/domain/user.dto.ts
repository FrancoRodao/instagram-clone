import { type OmitAndProhibit, type Optional } from '../../types'
import { type IUserModel } from './user.model'

type IUserCreate = OmitAndProhibit<IUserModel,
'role' | 'userFollowers' | 'userFollowed' | 'posts' |
'postsTaggedIn' | 'postsLiked' |
'postsCommented' | 'id'>

export type IUserDto =
  Optional<IUserCreate, 'biography' | 'profilePicture'>
