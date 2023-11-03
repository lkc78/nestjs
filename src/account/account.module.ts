import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Member_Old } from '../entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member_Old])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
