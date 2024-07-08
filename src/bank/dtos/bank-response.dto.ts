import { ApiProperty } from '@nestjs/swagger';

export class BankResponseDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
