import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BankRepository } from 'src/entities/bank.repository';
import { Wallet } from 'src/entities/wallet.entity';

@Entity({ repository: () => BankRepository })
export class Bank {
  @PrimaryKey()
  code: string;

  @Property()
  name: string;

  @Property()
  iconUrl: string;

  // @OneToMany({
  //   entity: () => Wallet,
  //   mappedBy: (groupWallet: Wallet) => groupWallet.bank,
  // })
  // groupWallets: Collection<Wallet> = new Collection<Wallet>(this);

  [EntityRepositoryType]?: BankRepository;
}
