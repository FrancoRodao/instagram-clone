import winston from 'winston'
import { isDevelopmentENV, isProductionENV, isDebugENV, isTestENV } from '../../shared/domain'
import { type ILogger, type ILoggerInfo } from '../domain/logger.interface'

const formatMetadata = (meta: ILoggerInfo): string => {
  return Object.keys(meta).length > 0 ? `Metadata: ${JSON.stringify(meta)}` : ''
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize(),
  winston.format.metadata({ fillExcept: ['level', 'message', 'timestamp'] }),
  winston.format.printf(
    ({ level, message, timestamp, metadata }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return `${timestamp} ${level}: ${formatMetadata(metadata)} ${message}`
    }
  )
)

const formatUncolorize = winston.format.combine(
  format,
  winston.format.uncolorize()
)

winston.addColors({
  error: 'bold red',
  warn: 'bold yellow',
  info: 'green',
  debug: 'magenta'
})

const levels = {
  crit: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
}

const level = (): string => {
  return isDevelopmentENV ? 'debug' : 'warn'
}

export class LoggerService implements ILogger {
  private readonly logger: winston.Logger

  constructor () {
    this.logger = winston.createLogger({
      level: level(),
      levels,
      format,
      transports: [],
      silent: isTestENV
    })

    if (isDevelopmentENV || isDebugENV || isTestENV) {
      this.logger.add(new winston.transports.Console({
        level: isDebugENV ? 'debug' : 'info'
      }))
    }

    if (isProductionENV) {
      this.logger.add(new winston.transports.Console({
        level: 'info'
      }))

      this.logger.add(
        new winston.transports.File({
          filename: 'logs/all.log',
          format: formatUncolorize
        })
      )
    }
  }

  debug (msg: string, meta?: ILoggerInfo): void {
    this.logger.debug(msg, meta)
  }

  info (msg: string, meta?: ILoggerInfo): void {
    this.logger.info(msg, meta)
  }

  warn (msg: string, meta?: ILoggerInfo): void {
    this.logger.warn(msg, meta)
  }

  error (msg: string, meta?: ILoggerInfo): void {
    this.logger.error(msg, meta)
  }
}
