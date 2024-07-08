import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankResponseDto } from 'src/bank/dtos/bank-response.dto';

@ApiTags('banks')
@Controller('banks')
export class BankController {
  @Get('banks')
  @ApiOkResponse({ type: [BankResponseDto] })
  @ApiOperation({ summary: '은행 코드 및 아이콘 리스트' })
  async findAllBanks() {}
}
