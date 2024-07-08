import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuthUser } from 'src/common/types/oauth.type';
import { User } from 'src/entities';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async oAuthLogin(oauthUser: OAuthUser) {
    const user = await this.userService.createOrUpdateUser({
      username: oauthUser.username,
      provider: oauthUser.provider,
      providerUserId: oauthUser.id,
      oauthAccessToken: oauthUser.accessToken,
      oauthRefreshToken: oauthUser.refreshToken,
      profileImage: oauthUser.profileImage,
    });

    return this.signIn(user);
  }

  private signIn(user: User): string {
    const accessToken = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    return accessToken;
  }
}
