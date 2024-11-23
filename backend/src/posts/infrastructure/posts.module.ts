import { Module, type Provider } from '@nestjs/common'
import { CreatePostController } from './controllers/createPost.controller'
import { postsDiTypes } from './postsDiTypes'
import { SequelizePostRepository } from './postsRepositoryImpl'
import { type IPostRepository } from '../domain/postRepository.interface'
import { CreatePost } from '../application/createPost.usecase'
import { loggerDiTypes, type ILogger } from '../../shared/services/logger/domain'
import { I18NModule } from '../../shared/services/i18n/infrastructure/i18n.module'
import { LoggerModule } from '../../shared/services/logger/infrastructure/logger.module'
import { AuthModule } from '../../auth/infrastructure/auth.module'
import { uploadMediaServiceDiTypes } from '../../shared/services/uploadMedia/infrastrucutre/uploadMediaDiTypes'
import { type IUploadMediaService } from '../../shared/services/uploadMedia/domain/uploadMediaService.interface'
import { UploadMediaModule } from '../../shared/services/uploadMedia/infrastrucutre/uploadMediaModule.module'
import { CreatePostComment } from '../application/createPostComment.usecase'
import { CreatePostCommentController } from './controllers/createPostComment.controller'
import { TagUserInAPostController } from './controllers/tagUserInAPost.controller'
import { TagUserInAPost } from '../application'
import { usersDiTypes } from '../../users/infrastructure/usersDiTypes'
import { type IUserRepository } from '../../users/domain'
import { UsersModule } from '../../users/infrastructure/users.module'
import { GetPostController } from './controllers/getPost.controller'
import { GetPost } from '../application/getPost.usecase'
import { CreatePostLike } from '../application/createPostLike.usecase'
import { CreatePostLikeController } from './controllers/createPostLike.controller'
import { DeletePostController } from './controllers/deletePost.controller'
import { DeletePost } from '../application/deletePost.usecase'

const PostsRepository: Provider = {
  provide: postsDiTypes.PostsRepository,
  useClass: SequelizePostRepository
}

const CreatePostProvider: Provider = {
  provide: CreatePost,
  useFactory: (loggerService: ILogger, userRepository: IUserRepository, postRepository: IPostRepository, uploadMediaService: IUploadMediaService) =>
    new CreatePost(loggerService, userRepository, postRepository, uploadMediaService),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: usersDiTypes.UserRepository, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false },
    { token: uploadMediaServiceDiTypes.UploadService, optional: false }
  ]
}

const CreatePostLikeProvider: Provider = {
  provide: CreatePostLike,
  useFactory: (loggerService: ILogger, userRepository: IUserRepository, postRepository: IPostRepository) =>
    new CreatePostLike(loggerService, userRepository, postRepository),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: usersDiTypes.UserRepository, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false }
  ]
}

const GetPostProvider: Provider = {
  provide: GetPost,
  useFactory: (loggerService: ILogger, postsRepository: IPostRepository) =>
    new GetPost(loggerService, postsRepository),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false }
  ]
}

const CreatePostCommentProvider: Provider = {
  provide: CreatePostComment,
  useFactory: (loggerService: ILogger, userRepository: IUserRepository, postRepository: IPostRepository) =>
    new CreatePostComment(loggerService, userRepository, postRepository),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: usersDiTypes.UserRepository, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false }
  ]
}

const TagUserInAPostProvider: Provider = {
  provide: TagUserInAPost,
  useFactory: (loggerService: ILogger, postsRepository: IPostRepository, userRepository: IUserRepository) =>
    new TagUserInAPost(loggerService, postsRepository, userRepository),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false },
    { token: usersDiTypes.UserRepository, optional: false }
  ]
}

const DeletePostProvider: Provider = {
  provide: DeletePost,
  useFactory: (loggerService: ILogger, userRepository: IUserRepository, postsRepository: IPostRepository) =>
    new DeletePost(loggerService, userRepository, postsRepository),
  inject: [
    { token: loggerDiTypes.Logger, optional: false },
    { token: usersDiTypes.UserRepository, optional: false },
    { token: postsDiTypes.PostsRepository, optional: false }
  ]
}

@Module({
  providers: [
    PostsRepository,
    CreatePostProvider,
    CreatePostLikeProvider,
    GetPostProvider,
    CreatePostCommentProvider,
    TagUserInAPostProvider,
    DeletePostProvider
  ],
  controllers: [
    CreatePostController,
    CreatePostLikeController,
    GetPostController,
    CreatePostCommentController,
    TagUserInAPostController,
    DeletePostController
  ],
  imports: [
    I18NModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    UploadMediaModule
  ]

})
export class PostsModule {}
