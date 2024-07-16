import { Wallet } from './wallet.entity';
import { User } from './user.entity';
import { WalletUser } from './wallet-user.entity';
import { Bank } from './bank.entity';
import { InviteLink } from './invite-link.entity';

export * from './user.entity';
export * from './user.repository';

export * from './wallet.entity';
export * from './wallet.repository';

export * from './wallet-user.entity';
export * from './wallet-user.repository';

export * from './bank.entity';
export * from './bank.repository';

export * from './invite-link.entity';
export * from './invite-link.repository';

export const entities = [User, Wallet, WalletUser, Bank, InviteLink];
