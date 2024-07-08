import { WalletRole, WalletRoleValueType, WalletUser } from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserForWalletDto implements Partial<WalletUser> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty({ enum: WalletRole })
  role: WalletRoleValueType;

  constructor(walletUser: WalletUser) {
    this.id = walletUser.user.id;
    this.username = walletUser.user.username;
    this.profileImage = walletUser.user.profileImage;
    this.profileImage = walletUser.user.profileImage;
    this.role = walletUser.role;
  }
}
