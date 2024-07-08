import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Wallet } from 'src/entities';

export class CreateWalletDTO implements Partial<Wallet> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  bankCode: string;
}
