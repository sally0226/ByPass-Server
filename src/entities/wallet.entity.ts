import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { WalletRepository } from './wallet.repository';
import { WalletUser } from 'src/entities/wallet-user.entity';
import { Bank } from 'src/entities/bank.entity';

@Entity({ repository: () => WalletRepository })
export class Wallet {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  accountNumber: string;

  @ManyToOne()
  bank: Bank;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany({
    entity: () => WalletUser,
    mappedBy: (walletUser: WalletUser) => walletUser.wallet,
  })
  walletUsers: Collection<WalletUser> = new Collection<WalletUser>(this);

  [EntityRepositoryType]?: WalletRepository;
}
