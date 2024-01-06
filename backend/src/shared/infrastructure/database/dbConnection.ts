import { Sequelize } from 'sequelize-typescript'
import { SequelizeUserFollowingModel, SequelizeUserModel } from '../../../users/infrastructure'
import { environment } from '../config/environment.config'
import { SequelizePostCommentModel, SequelizePostLikeModel, SequelizePostModel } from '../../../posts/infrastructure'
import { SequelizeUserTaggedInPostModel } from '../../../posts/infrastructure/models/userTaggedInPostModelImpl'
import { ILogger } from '../../../logger/domain'

export class DatabaseConnection {
  private sequelize: Sequelize
  private logger: ILogger

  constructor (logger: ILogger) {
    this.logger = logger

    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: environment('dbHost'),
      database: environment('dbName'),
      username: environment('dbUsername'),
      password: environment('dbPassword'),
      models: [
        SequelizeUserModel, SequelizePostModel, SequelizePostLikeModel,
        SequelizePostCommentModel, SequelizeUserFollowingModel,
        SequelizeUserTaggedInPostModel
      ],
      logging: (msg: string) => logger.debug(msg)
    })
  }

  public async connect (): Promise<void> {
    try {
      await this.sequelize.drop({ cascade: true })
      await this.sequelize.sync({ force: true })
      await this.sequelize.authenticate()

      this.logger.info('Database connection has been established successfully.')
    } catch (error) {
      // TODO: SHUTDOWN NODE JS PROCESS
      this.logger.error(`Unable to connect to the database: ${error}`)
    }
  }

  public async disconnect (): Promise<void> {
    await this.sequelize.connectionManager.close()
  }
}
