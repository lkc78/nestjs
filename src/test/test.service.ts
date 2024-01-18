import { Injectable } from '@nestjs/common';
import { EncryptService } from '../common/encrypt.service';
import { RedistService } from '../common/redis.service';

@Injectable()
export class TestService {
  constructor(private readonly encryptService: EncryptService, private readonly redistService: RedistService) {}

  encrypt(text: string): string {
    return this.encryptService.encrypt(text);
  }

  decrypt(text: string): string {
    return this.encryptService.decrypt(text);
  }

  encryptAES(text: string): string {
    return this.encryptService.encryptAES(text);
  }

  decryptAES(text: string): string {
    return this.encryptService.decryptAES(text);
  }

  async getRedisData(key: string): Promise<string> {
    const resultData = await this.redistService.getRedisData(key);
    return resultData;
  }

  async setRedisData(key: string, data: string) {
    await this.redistService.setRedisData(key, data);
  }
}
