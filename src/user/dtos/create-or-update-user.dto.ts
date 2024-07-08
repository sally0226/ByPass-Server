import { User } from 'src/entities';
import { OAuthProviderType } from 'src/common/types/oauth.type';
import { IsNotEmpty } from 'class-validator';

export class CreateOrUpdateUserDto implements Partial<User> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  provider: OAuthProviderType;

  @IsNotEmpty()
  oauthAccessToken: string;

  @IsNotEmpty()
  oauthRefreshToken: string;

  @IsNotEmpty()
  profileImage: string;

  @IsNotEmpty()
  providerUserId: string;
}
