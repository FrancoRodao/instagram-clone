import { SequelizeUserModel } from '../../users/infrastructure/models'
import { type IPostCommentModel } from '../domain'
import { PostEntity } from '../domain/entities/post.entity'
import { type IUpdatePostDto, type ICreatePostDto, type IPostCommentDto, type ICreatePostLikeDto } from '../domain/post.dto'
import { type IPostRepository } from '../domain/postRepository.interface'
import { SequelizePostCommentModel } from './models/postCommentModelImpl'
import { SequelizePostLikeModel } from './models/postLikeModelImpl'
import { SequelizePostModel } from './models/postModelImpl'
import { SequelizeUserTaggedInPostModel } from './models/userTaggedInPostModelImpl'

export class SequelizePostRepository implements IPostRepository {
  async create (
    createPostAttributes: ICreatePostDto,
    usersTaggedIds: string[]
  ): Promise<PostEntity> {
    const newPost = await SequelizePostModel.create(createPostAttributes)

    if (usersTaggedIds.length > 0) {
      const tagUsersInPostPromises = usersTaggedIds.map(
        async (userTaggedId) =>
          await SequelizeUserTaggedInPostModel.create({
            postId: newPost.id,
            userId: userTaggedId
          })
      )

      await Promise.all(tagUsersInPostPromises)
    }

    return this.mapToDomain(newPost)
  }

  async getById (id: string): Promise<PostEntity | null> {
    const postFound = await SequelizePostModel.findByPk(id, {
      include: [
        {
          model: SequelizePostCommentModel,
          attributes: ['commentBody', 'userAuthorId'],
          include: [{
            model: SequelizeUserModel,
            attributes: ['username', 'profilePicture']
          }]
        },
        {
          model: SequelizeUserModel,
          as: 'likes',
          attributes: ['username', 'profilePicture'],
          through: { attributes: [] },
          include: [{
            model: SequelizeUserModel,
            as: 'userFollowers',
            through: { attributes: [] }
          }]
        },
        {
          model: SequelizeUserModel,
          as: 'usersTagged',
          attributes: ['username', 'profilePicture'],
          through: { attributes: [] },
          include: [{
            model: SequelizeUserModel,
            as: 'userFollowers',
            through: { attributes: [] }
          }]
        }
      ]
    })

    return (postFound != null) ? this.mapToDomain(postFound) : null
  }

  async update (updatePostDto: IUpdatePostDto): Promise<PostEntity | null> {
    const postFound = await SequelizePostModel.findByPk(updatePostDto.id)

    if (postFound != null) {
      const postUpdated = await postFound.update(updatePostDto)

      return this.mapToDomain(postUpdated)
    }

    return null
  }

  async addComment ({ postId, userAuthorId, commentBody }: IPostCommentDto): Promise<IPostCommentModel> {
    return await SequelizePostCommentModel.create({
      commentBody,
      postId,
      userAuthorId
    })
  }

  async addOrRemoveLike ({ userId, postId }: ICreatePostLikeDto): Promise<void> {
    const existsLike = await SequelizePostLikeModel.findOne({
      where: {
        userId,
        postId
      }
    })

    if (existsLike === null) {
      await SequelizePostLikeModel.create({
        userId,
        postId
      })
    } else {
      // remove like
      await existsLike.destroy()
    }
  }

  async tagUserInAPost (userId: string, postId: string): Promise<void> {
    // check that user isn't tagged already with findorcreate method
    await SequelizeUserTaggedInPostModel.findOrCreate({
      where: {
        userId,
        postId
      }
    })
  }

  async delete (id: string): Promise<void> {
    await SequelizePostModel.destroy({
      where: { id }
    })
  }

  private mapToDomain (sequelizePost: SequelizePostModel): PostEntity {
    return new PostEntity(sequelizePost.dataValues)
  }
}
