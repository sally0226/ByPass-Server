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
import { getNodeEnv, ignoreEnvFile } from 'src/config/env.helper';
import { InviteLinkModule } from './invite-link/invite-link.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../.env.${getNodeEnv}`,
      isGlobal: true,
      validate: envValidate,
      cache: true,
      ignoreEnvFile: ignoreEnvFile,
    }),
    UserModule,
    MikroOrmModule.forRoot(),
    WalletModule,
    BankModule,
    InviteLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
