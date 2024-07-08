import { ApiProperty } from '@nestjs/swagger';
import { Bank } from 'src/entities';

export class BankResponseDto implements Partial<Bank> {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  iconURL: string;

  constructor(bank: Bank) {
    this.code = bank.code;
    this.name = bank.name;
    this.iconURL = bank.iconUrl;
  }
}
