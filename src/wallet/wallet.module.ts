import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Bank, Wallet, WalletUser } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([Wallet, WalletUser, Bank]), JwtModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
