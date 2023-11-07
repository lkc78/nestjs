import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Member {
  @Transform((params) => params.value.trim())
  @ApiProperty({
    example: 'Inkweon Kim',
    description: '사용자 아이디',
    required: true,
  })
  @PrimaryColumn({ length: 30 })
  userid: string;

  @Transform(({ value, obj }) => {
    if (obj.userpass.includes(obj.name.trim())) {
      throw new BadRequestException('password는 id와 같은 문자열을 포함할 수 없습니다.');
    }
    return value.trim();
  })
  @ApiProperty({
    example: 'dev1234567890',
    description: '사용자 비밀번호',
    required: true,
  })
  @Column({ length: 100 })
  userpass: string;

  @Column({ length: 30 })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'abc123@gmail.com',
    description: '사용자 이메일',
    required: true,
  })
  @Column({ length: 50 })
  email: string;

  @Column({ length: 30 })
  groupcode: string;

  @Column({ length: 1 })
  groupmember: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
