import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Member } from '../entities/member.entity';

// Dto
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async join(createAccountDto: CreateAccountDto): Promise<any> {
    // ID 및 Email 존재여부 확인
    let exist_userid = await this.memberRepository.exist({ where: { userid: createAccountDto.userid } });
    let exist_email = await this.memberRepository.exist({ where: { email: createAccountDto.email } });

    if (exist_userid) throw new HttpException('The user id is already exists. [' + createAccountDto.userid + ']', HttpStatus.BAD_REQUEST);
    if (exist_email) throw new HttpException('The email is already exists. [' + createAccountDto.email + ']', HttpStatus.BAD_REQUEST);

    // DB 저장
    const member = new Member();
    member.userid = createAccountDto.userid;
    member.userpass = createAccountDto.userpass;
    member.email = createAccountDto.email;
    member.nickname = createAccountDto.nickname;
    var result = await this.memberRepository.save(member);

    return result;
  }

  async login(loginAccountDto: LoginAccountDto): Promise<any> {
    let exist_userid = await this.memberRepository.exist({ where: { userid: loginAccountDto.userid, userpass: loginAccountDto.userpass } });
    if (!exist_userid) throw new HttpException('The login info is not invalid. [' + loginAccountDto.userid + ']', HttpStatus.BAD_REQUEST);

    let member = this.memberRepository.find({ where: { userid: loginAccountDto.userid, userpass: loginAccountDto.userpass } });
    return member;
  }
}
