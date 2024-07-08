import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User, UserRepository } from 'src/entities';
import { CreateOrUpdateUserDto } from 'src/user/dtos/create-or-update-user.dto';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async findOne(where: FilterQuery<User>) {
    return await this.userRepository.findOne(where);
  }

  async createOrUpdateUser(userDto: CreateOrUpdateUserDto): Promise<User> {
    let user: User = await this.userRepository.findOne({
      provider: userDto.provider,
      providerUserId: userDto.providerUserId,
    });
    if (user == null) {
      user = this.userRepository.create(userDto);
    } else {
      Object.assign(userDto, user);
    }

    await this.userRepository.flush();
    return user;
  }
}
