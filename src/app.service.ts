import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  DBInfo() {
    return {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_PORT: process.env.MYSQL_PORT,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    };
  }
}
