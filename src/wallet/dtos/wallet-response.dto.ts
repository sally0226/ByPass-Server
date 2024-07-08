import {
  Wallet,
  WalletRole,
  WalletRoleValueType,
  WalletUser,
} from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';

export class WalletUserResponseDto implements Partial<WalletUser> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty({ enum: WalletRole })
  role: WalletRoleValueType;
}

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

  @ApiProperty({ type: WalletUserResponseDto, isArray: true })
  users: WalletUserResponseDto[];
}
