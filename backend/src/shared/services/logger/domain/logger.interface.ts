export type ILoggerInfo = Record<string, unknown>

export interface ILogger {
  debug: (message: string, info?: ILoggerInfo) => void
  info: (message: string, info?: ILoggerInfo) => void
  error: (message: string, info?: ILoggerInfo) => void
  warn: (message: string, info?: ILoggerInfo) => void
}
