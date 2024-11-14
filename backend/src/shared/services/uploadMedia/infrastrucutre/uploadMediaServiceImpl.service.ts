import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { type IUploadMediaResponse, type IUploadMediaService } from '../domain/uploadMediaService.interface'
import { environment } from '../../../infrastructure/config/environment.config'

// TODO: RESIZE IMAGES
@Injectable()
export class CloudinaryUploadMediaService implements IUploadMediaService {
  constructor () {
    cloudinary.config({
      cloud_name: environment('cloudinaryCloudName'),
      api_key: environment('cloudinaryApiKey'),
      api_secret: environment('cloudinaryApiSecret')
    })
  }

  async upload (mediaBuffer: Buffer): Promise<IUploadMediaResponse> {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, uploadResult) => {
        if (error != null) {
          reject(error)
        }

        if (
          uploadResult?.created_at != null &&
          uploadResult?.secure_url !== null &&
          uploadResult?.bytes != null
        ) {
          resolve({
            created_at: uploadResult.created_at,
            url: uploadResult.secure_url,
            sizeInBytes: uploadResult.bytes
          })
        }
      }).end(mediaBuffer)
    })
  }
}
