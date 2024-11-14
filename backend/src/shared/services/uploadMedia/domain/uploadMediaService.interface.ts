export interface IUploadMediaResponse {
  url: string
  created_at: string
  sizeInBytes: number
}

export interface IUploadMediaService {
  upload: (buffer: Buffer) => Promise<IUploadMediaResponse>
}
