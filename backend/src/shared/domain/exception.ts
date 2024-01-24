/* eslint-disable no-unused-vars */

export enum Errors {
  FIELD_ALREADY_EXISTS = 'FIELD_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TRANSLATION_ERROR = 'TRANSLATION_ERROR'
}

export enum statusCodeError {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 401
}
/* eslint-disable no-unused-vars */

export class Exception extends Error {
  public codeError: Errors
  public statusCodeError: statusCodeError
  public descriptionToUser: string
  public timestamp: string

  constructor (codeError: Errors, statusCodeError: statusCodeError, descriptionToUser: string = '') {
    super(descriptionToUser)

    Object.setPrototypeOf(this, new.target.prototype)

    this.codeError = codeError
    this.statusCodeError = statusCodeError
    this.descriptionToUser = descriptionToUser
    this.timestamp = new Date().toISOString()
  }
}
