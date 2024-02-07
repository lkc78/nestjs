import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

// Error Codes
import { ErrorCodes, convertErrorMessage } from './error.enum';

export class ErrorException extends HttpException {
  constructor(errorCode: ErrorCodes | string, statusCode: number) {
    super(errorCode, statusCode);

    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = convertErrorMessage(errorCode, statusCode);
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: any;
}
