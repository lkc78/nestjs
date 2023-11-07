import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Entities
import { Member, Group } from '../entities';

// Dto
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  // 비밀번호 암호화
  async hashPassword(password: string) {
    // 첫 번째 인수 : 암호화할 비밀번호
    // 두 번째 인수 : 암호화에 사용될 salt 값, 값이 클수록 보안성이 높아지지만 암호화 시간이 길어진다.
    return await bcrypt.hash(password, 11);
  }

  // 동일 이메일 검사
  async findOneByEmail(email: string) {
    const user = await this.memberRepository.findOne({
      where: { email },
      //withDeleted: true, // DB에서 삭제된 정보를 포함해서 조회할 때 사용
    });

    if (user) {
      throw new BadRequestException('이미 생성된 유저입니다.');
    }

    return user;
  }

  async join(createAccountDto: CreateAccountDto): Promise<any> {
    // ID 및 Email 존재여부 확인
    const exist_userid = await this.memberRepository.exist({ where: { userid: createAccountDto.userid } });
    const exist_email = await this.memberRepository.exist({ where: { email: createAccountDto.email } });

    if (exist_userid) throw new HttpException('The user id is already exists. [' + createAccountDto.userid + ']', HttpStatus.BAD_REQUEST);
    if (exist_email) throw new HttpException('The email is already exists. [' + createAccountDto.email + ']', HttpStatus.BAD_REQUEST);

    // DB 저장
    const member = new Member();
    member.userid = createAccountDto.userid;
    member.userpass = createAccountDto.userpass;
    member.email = createAccountDto.email;
    member.username = createAccountDto.username;
    member.groupcode = createAccountDto.userid;
    member.groupmember = 'A';
    const result = await this.memberRepository.save(member);

    const group = new Group();
    group.groupcode = createAccountDto.userid;
    group.groupname = createAccountDto.groupname;
    await this.groupRepository.save(group);

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

  async findOne(input_id: string, input_pass: string): Promise<any> {
    const exist_userid = await this.memberRepository.exist({
      where: { userid: input_id, userpass: input_pass },
    });
    if (!exist_userid) throw new UnauthorizedException();

    const member = this.memberRepository.find({ where: { userid: input_id, userpass: input_pass } });
    return member;
  }
}
