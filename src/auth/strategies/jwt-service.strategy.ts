import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(Strategy, 'jwt-service') {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // JWT에서 추출한 payload를 검증하고 정보를 반환합니다.
  async validate(payload: any) {
    return {
      userid: payload.userid,
      username: payload.username,
      email: payload.email,
      created_at: payload.created_at,
    };
  }
}
