import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoGuard } from 'src/common/guards/kakao.guard';
import { OAuthLoginUser } from 'src/common/decorators/kakao-info.decorator';
import { OAuthUser } from 'src/common/types/oauth.type';
import { ConfigService } from '@nestjs/config';
import { getCookieOption } from 'src/common/helpers/cookie.helper';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login/kakao')
  @ApiOperation({ summary: '카카오 소셜 로그인 ✅' })
  @UseGuards(KakaoGuard)
  async kakaoSignIn(
    @OAuthLoginUser() oauthUser: OAuthUser,
    @Res() res,
  ): Promise<void> {
    const accessToken = await this.authService.oAuthLogin(oauthUser);

    res.cookie('Authorization', accessToken, getCookieOption());
    return res.redirect(
      302,
      this.configService.get('CLIENT_REDIRECT_URL') + '?token=' + accessToken,
    );
  }
}
