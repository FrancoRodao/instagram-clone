/* eslint-disable no-unused-vars */

enum CommonErrors {
  VALIDATION_ERROR = 'VALIDATION ERROR',
  FIELD_ALREADY_EXISTS = 'FIELD_ALREADY_EXISTS',
  TRANSLATION_ERROR = 'TRANSLATION_ERROR',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS'
}

enum AuthErrors {
  INVALID_AUTHORIZATION_TOKEN = 'INVALID_AUTHORIZATION_TOKEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
}

type ErrorsType = CommonErrors | AuthErrors
export const Errors = { CommonErrors, AuthErrors }

export enum statusCodeError {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}
/* eslint-disable no-unused-vars */

export class Exception extends Error {
  public codeError: ErrorsType
  public statusCodeError: statusCodeError
  public descriptionToUser: string
  public timestamp: string

  constructor (codeError: ErrorsType, statusCodeError: statusCodeError, descriptionToUser: string = '') {
    super(descriptionToUser)

    Object.setPrototypeOf(this, new.target.prototype)

    this.codeError = codeError
    this.statusCodeError = statusCodeError
    this.descriptionToUser = descriptionToUser
    this.timestamp = new Date().toISOString()
  }
}
