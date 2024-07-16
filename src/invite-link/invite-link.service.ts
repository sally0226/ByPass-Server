import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { InviteLink, InviteLinkRepository, User, Wallet } from 'src/entities';
import { INVITE_LINK_EXPIRATION_DAYS } from 'src/common/constants';
import { generateMD5TokenWithSalt } from 'src/utils/hash-utils';

@Injectable()
export class InviteLinkService {
  constructor(
    @InjectRepository(InviteLink)
    private readonly inviteLinkRepository: InviteLinkRepository,
  ) {}

  async create(user: User, wallet: Wallet): Promise<InviteLink> {
    const expiresAt: Date = this.getExpiration();
    const input: string = `wallet_id=${wallet.id}&user_id=${user.id}&expiration=${expiresAt.getTime()}`;
    const token: string = generateMD5TokenWithSalt(input, 5);
    const inviteLink = this.inviteLinkRepository.create({
      expiresAt: expiresAt,
      creator: user,
      wallet: wallet,
      token: token,
    });
    await this.inviteLinkRepository.persistAndFlush(inviteLink);
    return inviteLink;
  }

  async findOne(token: string): Promise<InviteLink> {
    return await this.inviteLinkRepository.findOne({ token });
  }

  private getExpiration(): Date {
    const now: Date = new Date();
    return new Date(
      now.getTime() + INVITE_LINK_EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
    );
  }
}
