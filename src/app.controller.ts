import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDBInfo(): string {
    console.log('getDBInfo');
    return this.appService.DBInfo() + '<br>Host : ' + process.env.MYSQL_HOST + '<br>Port : ' + process.env.MYSQL_PORT;
  }
}
