import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Member_Old } from '../entities/member.entity';

// Dto
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Member_Old)
    private memberRepository: Repository<Member_Old>,
  ) {}

  async join(createAccountDto: CreateAccountDto): Promise<any> {
    // ID 및 Email 존재여부 확인
    const exist_userid = await this.memberRepository.exist({ where: { userid: createAccountDto.userid } });
    const exist_email = await this.memberRepository.exist({ where: { email: createAccountDto.email } });

    if (exist_userid) throw new HttpException('The user id is already exists. [' + createAccountDto.userid + ']', HttpStatus.BAD_REQUEST);
    if (exist_email) throw new HttpException('The email is already exists. [' + createAccountDto.email + ']', HttpStatus.BAD_REQUEST);

    // DB 저장
    const member = new Member_Old();
    member.userid = createAccountDto.userid;
    member.userpass = createAccountDto.userpass;
    member.email = createAccountDto.email;
    member.nickname = createAccountDto.nickname;
    const result = await this.memberRepository.save(member);

    return result;
  }

  async login(loginAccountDto: LoginAccountDto): Promise<any> {
    const exist_userid = await this.memberRepository.exist({
      where: { userid: loginAccountDto.userid, userpass: loginAccountDto.userpass },
    });
    if (!exist_userid) throw new HttpException('The login info is not invalid. [' + loginAccountDto.userid + ']', HttpStatus.BAD_REQUEST);

    const member = this.memberRepository.find({ where: { userid: loginAccountDto.userid, userpass: loginAccountDto.userpass } });
    return member;
  }
}
