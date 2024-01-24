import bcrypt from 'bcrypt'
import { type IEncryptService } from '../../domain'

export class EncryptService implements IEncryptService {
  private readonly rounds: number = 10

  async hash (hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds)
  }

  async compare (password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  }
}
