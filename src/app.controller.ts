import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return (
      '<div style="position:absolute; top:50%; left:50%; margin-left:-65px; margin-top:-10px; font-size:18px;">' +
      process.env.Service_Name +
      '</div>'
    );
  }

  @Get('getDBInfo')
  getDBInfo() {
    return this.appService.DBInfo();
  }
}
