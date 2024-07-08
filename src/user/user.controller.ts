import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dtos/response.dto';
import { User } from 'src/entities';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiOperation({ summary: '내 정보 조회' })
  async me(@CurrentUser user: User): Promise<User> {}
}
