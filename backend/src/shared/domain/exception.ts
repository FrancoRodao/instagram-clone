/* eslint-disable no-unused-vars */

export enum Errors {
  FIELD_IS_REQUIRED = 'FIELD_IS_REQUIRED',
  FIELD_ALREADY_EXISTS = 'FIELD_ALREADY_EXISTS'
}

export enum statusCodeError{
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 401
}
/* eslint-disable no-unused-vars */

export class Exception extends Error {
  public codeError: Errors
  public statusCodeError: statusCodeError
  public description?: string
  public timestamp: string

  constructor (codeError: Errors, statusCodeError: statusCodeError, description?: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype)

    this.timestamp = new Date().toISOString()
    this.description = description
    this.codeError = codeError
    this.statusCodeError = statusCodeError
  }
}
