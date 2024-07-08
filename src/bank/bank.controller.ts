import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankResponseDto } from 'src/bank/dtos/bank-response.dto';
import { BankService } from 'src/bank/bank.service';
import { Bank } from 'src/entities';

@ApiTags('banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('banks')
  @ApiOkResponse({ type: [BankResponseDto] })
  @ApiOperation({ summary: '은행 코드 및 아이콘 리스트 ✅' })
  async findAll(): Promise<BankResponseDto[]> {
    const banks: Bank[] = await this.bankService.findAll();
    return banks.map((item) => new BankResponseDto(item));
  }
}
