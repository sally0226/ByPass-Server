import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';
import { User } from 'src/entities';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserService } from 'src/user/user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiOperation({ summary: '내 정보 조회 ✅' })
  me(@CurrentUser() user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}
