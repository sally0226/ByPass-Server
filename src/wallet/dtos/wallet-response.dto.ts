import { Wallet, WalletUser } from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';
import { UserForWalletDto } from 'src/wallet/dtos/user-for-wallet.dto';

export class WalletResponseDto implements Partial<Wallet> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  bankCode: string;

  @ApiProperty({ type: UserForWalletDto, isArray: true })
  users: UserForWalletDto[];

  constructor(wallet: Wallet) {
    this.id = wallet.id;
    this.name = wallet.name;
    this.createdAt = wallet.createdAt;
    this.updatedAt = wallet.updatedAt;
    this.accountNumber = wallet.accountNumber;
    this.bankCode = wallet.bank.code;
    this.users = wallet.walletUsers
      .getItems()
      .map((item: WalletUser) => new UserForWalletDto(item));
  }
}
