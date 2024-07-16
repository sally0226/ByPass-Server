import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDTO } from 'src/wallet/dtos/create-wallet.dto';
import {
  Bank,
  BankRepository,
  User,
  Wallet,
  WalletRepository,
  WalletRole,
  WalletUser,
  WalletUserRepository,
} from 'src/entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: WalletRepository,
    @InjectRepository(WalletUser)
    private readonly walletUserRepository: WalletUserRepository,
    @InjectRepository(Bank)
    private readonly bankRepository: BankRepository,
  ) {}
  async create(createWalletDto: CreateWalletDTO, user: User): Promise<Wallet> {
    const { name, accountNumber, bankCode } = createWalletDto;
    const bank: Bank = await this.bankRepository.findOne({ code: bankCode });
    if (!bank) {
      throw new Error(`Bank with code ${bankCode} not found`);
    }

    const wallet: Wallet = this.walletRepository.create({
      name: name,
      accountNumber: accountNumber,
      bank: bank,
    });

    this.walletUserRepository.create({
      user: user,
      wallet: wallet,
      role: WalletRole.ADMIN,
    });
    await this.walletRepository.flush();

    return wallet;
  }

  async findAll(user: User): Promise<WalletUser[]> {
    return await this.walletUserRepository.find(
      { user: user },
      { populate: ['wallet'] },
    );
  }

  async findOne(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ id });
  }

  async findWalletUser(user: User, id: number): Promise<WalletUser> {
    const walletUser = await this.walletUserRepository.findOne({
      user,
      wallet: { id: id },
    });

    if (!walletUser) {
      throw new NotFoundException('존재하지 않는 멤버입니다.');
    }

    return walletUser;
  }
}
