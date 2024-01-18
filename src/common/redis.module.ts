import { Module } from '@nestjs/common';
import { RedistService } from './redis.service';

@Module({
  imports: [],
  providers: [RedistService],
})
export class RedistModule {}
