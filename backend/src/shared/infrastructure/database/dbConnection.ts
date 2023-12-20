import { Sequelize } from 'sequelize-typescript'
import { SequelizeUserFollowingModel, SequelizeUserModel } from '../../../users/infrastructure'
import { environment } from '../config/environment.config'
import { SequelizePostCommentModel, SequelizePostLikeModel, SequelizePostModel } from '../../../posts/infrastructure'
import { SequelizeUserTaggedInPostModel } from '../../../posts/infrastructure/models/userTaggedInPostModelImpl'

export class DatabaseConnection {
  private sequelize: Sequelize

  constructor () {
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
      // TODO: LOGGER
      logging: false
      // logging: (msg: string) => logger.debug(msg)
    })
  }

  public async initConnection (): Promise<void> {
    await this.connect()
  }

  public async connect (): Promise<void> {
    try {
      await this.sequelize.drop({ cascade: true })
      await this.sequelize.sync({ force: true })
      await this.sequelize.authenticate()
      // TODO: LOGGER
      // logger.info('Database connection has been established successfully.')
    } catch (err) {
      // TODO: SHUTDOWN NODE JS PROCESS
      // TODO: LOGGER
      // logger.error(`Unable to connect to the database: ${error}`)
    }
  }

  public async disconnect (): Promise<void> {
    await this.sequelize.connectionManager.close()
  }
}
