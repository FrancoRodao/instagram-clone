export interface IEncryptService {
  hash: (hashString: string) => Promise<string>
  compare: (password: string, hashPassword: string) => Promise<boolean>
}
