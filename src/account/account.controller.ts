import { Controller, Get, Post, Body, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginAccountDto } from './dto/login-account.dto';
import { ResponseAccountDto } from './dto/response-account.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(private readonly accountService: AccountService) {}

  @Post('join')
  @ApiOperation({ summary: '회원가입', description: '회원가입을 할 수 있다.' })
  @ApiCreatedResponse({ description: '회원가입정보', type: ResponseAccountDto })
  async join(@Body() createAccountDto: CreateAccountDto) {
    try {
      return await this.accountService.join(createAccountDto);
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: '회원 로그인', description: '회원 로그인을 할 수 있다.' })
  @ApiCreatedResponse({ description: '회원로그인정보', type: ResponseAccountDto })
  async login(@Body() loginAccountDto: LoginAccountDto) {
    try {
      return await this.accountService.login(loginAccountDto);
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }
}
