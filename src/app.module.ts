import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WalletModule } from './wallet/wallet.module';
import { envValidate } from 'src/config/env.validation';
import { BankModule } from './bank/bank.module';
import { getNodeEnv } from 'src/config/env.helper';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../.env.${getNodeEnv}`,
      isGlobal: true,
      validate: envValidate,
      cache: true,
    }),
    UserModule,
    MikroOrmModule.forRoot(),
    WalletModule,
    BankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
