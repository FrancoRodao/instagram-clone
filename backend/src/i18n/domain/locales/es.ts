import { ITranslationStructure } from './translationStructure'
/*
  ---= CONVECTION =---

  keywords of translation inside {{ }} and in uppercase
  need an interpolation value
*/

export const localeES: ITranslationStructure = {
  UserRegistered: 'Usuario registrado correctamente',
  errors: {
    UnexpectedError: 'Error inesperado',
    UsernameIsAlreadyRegistered: 'El nombre de usuario ya está registrado',
    EmailIsAlreadyRegistered: 'Este correo electrónico ya está registrado, por favor utilice otro',
    InvalidUserCredentials: 'Credenciales invalidas',
    TranslationError: 'Error al traducir'
  }
}
