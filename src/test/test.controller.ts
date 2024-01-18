import { Controller, Get, Param, Logger } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  private readonly logger = new Logger(TestController.name);

  @Get('encrypt/:text')
  @ApiOperation({
    summary: 'AES256 암호화 [CBC]',
    description: '문자를 AES256 방법으로 암호화할 수 있다.',
  })
  encrypt(@Param('text') text: string): any {
    return { Result: this.testService.encrypt(text) };
  }

  @ApiOperation({
    summary: 'AES256 복호화 [CBC]',
    description: '문자를 AES256 방법으로 복호화할 수 있다.',
  })
  @Get('decrypt/:text')
  decrypt(@Param('text') text: string): any {
    return { Result: this.testService.decrypt(text) };
  }

  @ApiOperation({
    summary: 'AES256 암호화 [ECB]',
    description: '문자를 AES256 방법으로 암호화할 수 있다.',
  })
  @Get('encryptAES/:text')
  encryptAES(@Param('text') text: string): any {
    return { Result: this.testService.encryptAES(text) };
  }

  @ApiOperation({
    summary: 'AES256 복호화 [ECB]',
    description: '문자를 AES256 방법으로 복호화할 수 있다.',
  })
  @Get('decryptAES/:text')
  decryptAES(@Param('text') text: string): any {
    return { Result: this.testService.decryptAES(text) };
  }

  @Get('getRedisData/:key')
  async getRedisData(@Param('key') key: string): Promise<any> {
    const returnData = await this.testService.getRedisData(key);
    return { Result: returnData };
  }

  @Get('setRedisData/:key/:value')
  async setRedisData(@Param('key') key: string, @Param('value') value: string): Promise<any> {
    await this.testService.setRedisData(key, value);
    return { Return: value };
  }
}
