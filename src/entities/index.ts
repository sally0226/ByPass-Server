import { Wallet } from './wallet.entity';
import { User } from './user.entity';
import { WalletUser } from './wallet-user.entity';

export * from './user.entity';
export * from './user.repository';

export * from './wallet.entity';
export * from './wallet.repository';

export * from './wallet-user.entity';
export * from './wallet-user.repository';

export const entities = [User, Wallet, WalletUser];
