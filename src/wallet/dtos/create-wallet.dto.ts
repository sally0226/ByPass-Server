import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
