import { User } from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements Partial<User> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
