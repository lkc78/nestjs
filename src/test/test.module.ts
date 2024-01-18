import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { EncryptService } from '../common/encrypt.service';
import { RedistService } from '../common/redis.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService, EncryptService, RedistService],
})
export class TestModule {}
