import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDto {
  @ApiProperty({ description: '사용자 아이디' })
  userid: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  userpass: string;

  @ApiProperty({ description: '사용자 E-Mail' })
  email: string;

  @ApiProperty({ description: '사용자 별명' })
  nickname: string;
}
