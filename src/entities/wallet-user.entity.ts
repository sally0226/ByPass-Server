import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKeyProp,
  Property,
  Rel,
} from '@mikro-orm/core';

import { User } from './user.entity';
import { WalletUserRepository } from 'src/entities/wallet-user.repository';
import { Wallet } from 'src/entities/wallet.entity';

export const WalletRole = {
  ADMIN: 'ADMIN',
  READ: 'READ',
  WRITE: 'WRITE',
} as const;

export type WalletRoleValueType = (typeof WalletRole)[keyof typeof WalletRole];

@Entity({ repository: () => WalletUserRepository })
export class WalletUser {
  @ManyToOne(() => User, { primary: true })
  user: Rel<User>;

  @ManyToOne(() => Wallet, { primary: true })
  wallet: Rel<Wallet>;

  @Enum({ items: [WalletRole.ADMIN, WalletRole.READ, WalletRole.WRITE] })
  role: WalletRoleValueType;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [PrimaryKeyProp]: ['user', 'group'];

  [EntityRepositoryType]?: WalletUserRepository;
}
