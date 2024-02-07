import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { EncryptService } from 'src/common/encrypt.service';

// Error Codes
import { ErrorException } from 'src/common/exception/error_exception';
import { ErrorCodes } from 'src/common/exception/error.enum';

@Injectable()
export class AESAuthGuard implements CanActivate {
  constructor(private encryptService: EncryptService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    //console.log(authorization);
    try {
      if (authorization) {
        const [scheme, token] = authorization.split(' ');
        //console.log([scheme, token]);
        if (scheme.toLowerCase() === 'bearer') {
          const decryptStr = this.encryptService.decryptAES(token);

          if (decryptStr == '') {
            // 복호화 실패시
            throw new ErrorException(ErrorCodes.AUT_ERROR_004, HttpStatus.UNAUTHORIZED);
            return false;
          } else {
            try {
              const decStr: string[] = decryptStr.split('|');
              if (Number(decStr[1]) < new Date().getTime()) {
                // 토큰 기간 만료시
                throw new ErrorException(ErrorCodes.AUT_ERROR_005, HttpStatus.UNAUTHORIZED);
                return false;
              }
              return true;
            } catch {
              // 프로그램 오류시
              throw new ErrorException(ErrorCodes.AUT_ERROR_004, HttpStatus.UNAUTHORIZED);
              return false;
            }
          }
        }
        return false;
      }
      // 토큰 미입력시
      throw new ErrorException(ErrorCodes.AUT_ERROR_004, HttpStatus.UNAUTHORIZED);
    } catch (ex) {
      throw new ErrorException(ex.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
