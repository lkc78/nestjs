import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Member } from '../entities/member.entity';
import { Group } from '../entities/group.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Group]), AuthModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
