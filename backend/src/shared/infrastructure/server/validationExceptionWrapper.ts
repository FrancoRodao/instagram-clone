import { BadRequestException } from '@nestjs/common'

export class ValidationExceptionWrapper extends BadRequestException {
  constructor (public errors: any) {
    super(errors)
  }
}
