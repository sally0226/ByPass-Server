import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/entities/user.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { InviteLinkRepository } from 'src/entities/invite-link.repository';

@Entity({ repository: () => InviteLinkRepository })
export class InviteLink {
  @PrimaryKey()
  token: string;

  @ManyToOne()
  creator: User;

  @ManyToOne()
  wallet: Wallet;

  @Property()
  expiresAt: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
