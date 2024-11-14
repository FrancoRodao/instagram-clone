import { Module, type Provider } from '@nestjs/common'
import { CloudinaryUploadMediaService } from './uploadMediaServiceImpl.service'
import { uploadMediaServiceDiTypes } from './uploadMediaDiTypes'

const UploadMediaServiceProvider: Provider = {
  provide: uploadMediaServiceDiTypes.UploadService,
  useClass: CloudinaryUploadMediaService
}

@Module({
  providers: [UploadMediaServiceProvider],
  exports: [UploadMediaServiceProvider]
})
export class UploadMediaModule {}
