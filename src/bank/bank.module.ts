import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Bank } from 'src/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
