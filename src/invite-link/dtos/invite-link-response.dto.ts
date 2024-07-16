import { InviteLink } from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';
import { WalletResponseDto } from 'src/wallet/dtos/wallet-response.dto';

export class InviteLinkResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty({ type: UserResponseDto })
  creator: UserResponseDto;

  @ApiProperty({ type: WalletResponseDto })
  wallet: WalletResponseDto;

  constructor(inviteLink: InviteLink) {
    this.token = inviteLink.token;
    this.expiresAt = inviteLink.expiresAt;
    this.creator = new UserResponseDto(inviteLink.creator);
    this.wallet = new WalletResponseDto(inviteLink.wallet);
  }
}
