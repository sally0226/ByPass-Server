import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Bank, Wallet, WalletUser } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { InviteLinkModule } from 'src/invite-link/invite-link.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Wallet, WalletUser, Bank]),
    JwtModule,
    InviteLinkModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
