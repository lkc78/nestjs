import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Member } from '../entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
