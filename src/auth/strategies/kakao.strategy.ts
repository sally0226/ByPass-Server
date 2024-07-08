import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { OAuthUser } from 'src/common/types/oauth.type';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      callbackURL: configService.get('KAKAO_OAUTH_CALLBACK_URL'),
      //   scope: [''],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: OAuthUser, info?: any) => void,
  ) {
    try {
      const {
        _json: { id },
      }: { _json: { id: string } } = profile;

      return done(null, {
        id: id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: profile.email,
        username: profile.username,
        provider: profile.provider,
        profileImage: profile._json.properties.profile_image,
      });
    } catch (e) {
      done(e);
    }
  }
}
