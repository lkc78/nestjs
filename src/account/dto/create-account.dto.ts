import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsNotEmpty({ message: '사용자 아이디는 필수 항목입니다.' })
  @IsString({ message: 'ID는 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '사용자 아이디' })
  userid: string;

  @IsNotEmpty({ message: '사용자 비밀번호는 필수 항목입니다.' })
  @IsString({ message: 'ID는 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '사용자 비밀번호' })
  userpass: string;

  @IsNotEmpty({ message: 'E-mail은 필수 항목입니다.' })
  @IsEmail()
  @ApiProperty({ description: '사용자 E-Mail' })
  email: string;

  @IsNotEmpty({ message: '사용자명은 필수 항목입니다.' })
  @IsString({ message: '사용자명은 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @IsNotEmpty({ message: '그룹명은 필수 항목입니다.' })
  @IsString({ message: '그룹명은 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '그룹 이름' })
  groupname: string;
}
