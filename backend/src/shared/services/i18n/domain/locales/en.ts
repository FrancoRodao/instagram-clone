import { type ITranslationStructure } from './translationStructure'

/*
  ---= CONVECTION =---

  keywords of translation inside {{ }} and in uppercase
  need an interpolation value
*/

export const localeEN: ITranslationStructure = {
  UserRegistered: 'User successfully registered',
  errors: {
    UnexpectedError: 'Unexpected error',
    UsernameIsAlreadyRegistered: 'Username is already registered',
    EmailIsAlreadyRegistered: 'This email is already registered, please use another one',
    InvalidUserCredentials: 'Invalid user credentials.',
    TranslationError: 'Error when translating'
  }
}
