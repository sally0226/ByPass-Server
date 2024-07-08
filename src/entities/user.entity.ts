import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { OAuthProviderType } from 'src/common/types/oauth.type';

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  username: string;

  @Property()
  provider: OAuthProviderType;

  @Property()
  providerUserId: string;

  @Property()
  oauthAccessToken: string;

  @Property()
  oauthRefreshToken: string;

  @Property()
  profileImage: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: UserRepository;
}
