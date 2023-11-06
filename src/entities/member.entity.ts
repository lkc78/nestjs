import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Member {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  userid: string;

  @Transform(({ value, obj }) => {
    if (obj.userpass.includes(obj.name.trim())) {
      throw new BadRequestException('password는 id와 같은 문자열을 포함할 수 없습니다.');
    }
    return value.trim();
  })
  @Column({ length: 50 })
  userpass: string;

  @Column({ length: 30 })
  username: string;

  @IsEmail()
  @Column({ length: 50 })
  email: string;

  @Column({ type: 'bigint' })
  groupcode: number;

  @Column({ length: 30 })
  groupname: string;

  @Column({ length: 1 })
  groupmember: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
