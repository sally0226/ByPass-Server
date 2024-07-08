import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { WalletRepository } from './wallet.repository';

@Entity({ repository: () => WalletRepository })
export class Wallet {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: WalletRepository;
}
