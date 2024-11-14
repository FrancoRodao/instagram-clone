import dotenv from 'dotenv'
import path from 'path'
import { isDebugENV, isDevelopmentENV, isProductionENV, isTestENV } from '../../domain'
// import { logger } from '../../utils/logger'

function configEnv (envFileName: string): void {
  const envFilesFolderDir = process.cwd()

  const { error } = dotenv.config({
    path: path.join(envFilesFolderDir, envFileName)
  })

  if (error != null) {
    // TODO: LOGGER
    // logger.error(`Error configuring the environment ${error.stack}`)
    process.exit(1)
  }
}

interface IEnvironment {
  port: string

  dbHost: string
  dbName: string
  dbUsername: string
  dbPassword: string

  cloudinaryCloudName: string
  cloudinaryApiKey: string
  cloudinaryApiSecret: string

  SECRET_KEY: string
}

let environmentObj: IEnvironment

function setupEnvironment (): void {
  if (isDevelopmentENV || isDebugENV || isTestENV) configEnv('/.env.development')

  if (isProductionENV) configEnv('/.env.production')

  environmentObj = {
    port: process.env.PORT ?? '',

    dbHost: process.env.DATABASE_HOST ?? '',
    dbName: process.env.DATABASE_NAME ?? '',
    dbUsername: process.env.DATABASE_USERNAME ?? '',
    dbPassword: process.env.DATABASE_PASSWORD ?? '',

    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? '',
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? '',

    SECRET_KEY: process.env.SECRET_KEY ?? ''
  }

  const keysWithErrors = Object.keys(environment).filter((k) => environment[k as keyof typeof environment] === '')

  if (keysWithErrors.length > 0) {
    // TODO: LOGGER
    console.error(`There are problems with the following environment variables: ${keysWithErrors.toString()}`)

    // logger.error(`There are problems with the following environment variables: ${keysWithErrors}`)
    process.exit(1)
  }

  // force to use environment function
  process.env = {}
}

export function environment (key: keyof IEnvironment): string {
  if (JSON.stringify(process.env) !== '{}') {
    setupEnvironment()
  }

  return environmentObj[key]
}
