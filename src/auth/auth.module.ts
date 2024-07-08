import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get('JWT_PRIVATE_KEY'),
        publicKey: configService.get('JWT_PUBLIC_KEY'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1d',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
  ],
  providers: [AuthService, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
