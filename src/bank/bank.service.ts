import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Bank, BankRepository } from 'src/entities';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: BankRepository,
  ) {}

  async findAll(): Promise<Bank[]> {
    return await this.bankRepository.findAll();
  }
}
