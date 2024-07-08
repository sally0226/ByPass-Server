import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WalletResponseDto } from 'src/wallet/dtos/wallet-response.dto';
import { InviteLinkResponseDto } from 'src/wallet/dtos/invite-link-response.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities';
import { CreateWalletDTO } from 'src/wallet/dtos/create-wallet.dto';

@ApiTags('wallets')
@ApiBearerAuth()
@Controller('wallets')
export class WalletController {
  @Post()
  @ApiOkResponse({ type: WalletResponseDto })
  @ApiOperation({ summary: '그룹 지갑 생성' })
  async create(
    @CurrentUser() user: User,
    @Body() createWalletDto: CreateWalletDTO,
  ) {}

  @Get()
  @ApiOkResponse({ type: [WalletResponseDto] })
  @ApiOperation({ summary: '사용자가 속한 그룹 지갑 목록' })
  async findAll(@CurrentUser() user: User) {}

  @Get(':id')
  @ApiOkResponse({ type: WalletResponseDto })
  @ApiOperation({ summary: '그룹 지갑 정보 조회' })
  async findOne(@CurrentUser() user: User, @Param('id') id: string) {}

  @Post(':id/invite-links')
  @ApiOperation({
    summary: '그룹 지갑 초대링크 생성',
    description: '백엔드에서는 초대 링크에 사용될 token만 생성해 response',
  })
  @ApiOkResponse({ type: InviteLinkResponseDto })
  async createInviteLink(@CurrentUser() user: User, @Param('id') id: string) {}
}
