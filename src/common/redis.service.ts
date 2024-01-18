import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedistService {
  constructor(@InjectRedis() private readonly client: Redis) {}

  async getRedisData(key: string): Promise<string> {
    const resultData = await this.client.get(key);
    return resultData;
  }

  async setRedisData(key: string, data: string) {
    await this.client.set(key, data, 'EX', 30);
  }
}
