// src/auth/auth.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private jwtService: JwtService,
  ) {}

  async validateServiceUser(userid: string, password: string): Promise<any> {
    const user = await this.memberRepository.findOne({
      where: {
        userid: userid,
      },
    });

    if (!user) {
      throw new ForbiddenException('등록되지 않은 사용자입니다.');
    }

    // 전달받은 비밀번호와 DB에 저장된 비밀번호가 일치하는지 확인
    if (!(await bcrypt.compare(password, user.userpass))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  loginServiceUser(member: Member) {
    const payload = {
      userid: member.userid,
      username: member.username,
      email: member.email,
      created_at: member.created_at,
    };
    return {
      // 사용자 정보를 JWT 안에 전달
      token: this.jwtService.sign(payload),
    };
  }
}
