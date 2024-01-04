import { OmitAndProhibit, Optional } from '../../types'
import { IUserModel } from './user.model'

type IUserCreate = OmitAndProhibit<IUserModel,
    'role' | 'userFollowers' | 'userFollowed' | 'posts' |
    'postsTaggedIn' | 'postsLiked' |
    'postsCommented' | 'id'>

export type IUserDto =
  Optional<IUserCreate, 'biography' | 'profilePicture'>
