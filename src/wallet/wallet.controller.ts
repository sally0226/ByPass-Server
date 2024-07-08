import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
import { WalletService } from 'src/wallet/wallet.service';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { WalletForUserDto } from 'src/wallet/dtos/wallet-for-user.dto';

@ApiTags('wallets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post()
  @ApiOkResponse({ type: WalletResponseDto })
  @ApiOperation({ summary: '그룹 지갑 생성 ✅' })
  async create(
    @CurrentUser() user: User,
    @Body() createWalletDto: CreateWalletDTO,
  ) {
    const wallet = await this.walletService.create(createWalletDto, user);
    return new WalletResponseDto(wallet);
  }

  @Get()
  @ApiOkResponse({ type: [WalletResponseDto] })
  @ApiOperation({ summary: '사용자가 속한 그룹 지갑 목록 ✅' })
  async findAll(@CurrentUser() user: User): Promise<WalletForUserDto[]> {
    const walletList = await this.walletService.findAll(user);
    return walletList.map((item) => new WalletForUserDto(item));
  }

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
