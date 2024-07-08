import { ApiProperty } from '@nestjs/swagger';
import { WalletRole, WalletRoleValueType, WalletUser } from 'src/entities';

export class WalletForUserDto implements Partial<WalletUser> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  bankCode: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: WalletRole })
  role: WalletRoleValueType;

  constructor(walletUser: WalletUser) {
    this.id = walletUser.wallet.id;
    this.name = walletUser.wallet.name;
    this.accountNumber = walletUser.wallet.accountNumber;
    this.bankCode = walletUser.wallet.bank.code;
    this.role = walletUser.role;
  }
}
