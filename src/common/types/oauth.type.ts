export class OAuthUser {
  id: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  provider: OAuthProviderType;
  profileImage: string;
}

export enum OAuthProvider {
  KAKAO = 'KAKAO',
}
export type OAuthProviderType = `${OAuthProvider}`;
