import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';

@Module({
  imports: [],
  providers: [EncryptService],
})
export class EncryptModule {}
