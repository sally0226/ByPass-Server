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

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.profileImage = user.profileImage;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
