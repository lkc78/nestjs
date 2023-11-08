import { Controller, Post, Body, HttpStatus, HttpException, Logger, UseGuards, Req, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { LocalServiceAuthGuard } from '../auth/guards/local-service.guard';
import { AuthService } from '../auth/auth.service';
import { JwtServiceAuthGuard } from '../auth/guards/jwt-service.guard';

import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginAccountDto } from './dto/login-account.dto';
import { ResponseAccountDto } from './dto/response-account.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger(AccountController.name);

  @Post('join')
  @ApiOperation({ summary: '회원가입', description: '회원가입을 할 수 있다.' })
  @ApiCreatedResponse({ description: '회원가입정보', type: ResponseAccountDto })
  async join(@Body() createAccountDto: CreateAccountDto) {
    try {
      // 이메일 중복체크
      await this.accountService.findOneByEmail(createAccountDto.email);

      // 비밀번호 암호화
      const hashPassword = await this.accountService.hashPassword(createAccountDto.userpass);
      createAccountDto.userpass = hashPassword;

      return await this.accountService.join(createAccountDto);
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login_jwt')
  @UseGuards(LocalServiceAuthGuard)
  @ApiOperation({ summary: '회원 로그인', description: '회원 로그인을 할 수 있다.' })
  @ApiCreatedResponse({ description: '회원로그인정보', type: ResponseAccountDto })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login_jwt(@Req() req, @Body() loginAccountDto: LoginAccountDto) {
    try {
      const token = this.authService.loginServiceUser(req.user);
      return token;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: '회원 로그인', description: '회원 로그인을 할 수 있다.' })
  @ApiCreatedResponse({ description: '회원로그인정보', type: ResponseAccountDto })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Body() loginAccountDto: LoginAccountDto) {
    try {
      return await this.accountService.login(loginAccountDto);
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: '내 정보 조회 API', description: '이름, 메일 등을 조회한다.' })
  @UseGuards(JwtServiceAuthGuard)
  @Get('profile_jwt')
  async getProfile() {
    return {
      result: true,
      message: '내 정보를 조회합니다.',
    };
  }
}
