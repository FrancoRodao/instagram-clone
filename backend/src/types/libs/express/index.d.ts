// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'
import { type IJwtUserPayload } from '../../../auth/domain'

declare global {
  namespace Express {
    interface Request {
      userPayload?: IJwtUserPayload
    }
  }
}
