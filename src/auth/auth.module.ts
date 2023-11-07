import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalServiceStrategy } from './strategies/local-service.strategy';
import { JwtServiceStrategy } from './strategies/jwt-service.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    // 인증을 구현할 때 session을 사용하지 않도록 설정
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          // JWT 토큰을 생성하고 검증할 때 사용되는 비밀키
          secret: configService.get('SECRET_KEY'),
          // JWT가 만료되는 시간을 설정, 1년
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalServiceStrategy, JwtServiceStrategy],
  exports: [AuthService],
})
export class AuthModule {}
