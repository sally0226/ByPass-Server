import { Module } from '@nestjs/common';
import { InviteLinkService } from 'src/invite-link/invite-link.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { InviteLink } from 'src/entities';

@Module({
  imports: [MikroOrmModule.forFeature([InviteLink])],
  providers: [InviteLinkService],
  exports: [InviteLinkService],
})
export class InviteLinkModule {}
