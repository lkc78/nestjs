import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  DBInfo(): string {
    return '=== Database Information ===';
  }
}
