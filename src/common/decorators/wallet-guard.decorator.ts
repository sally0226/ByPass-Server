import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { WalletRole, WalletRoleValueType } from 'src/entities';
import { WalletGuard } from 'src/common/guards/wallet.guard';

export const UseWalletRoleGuard = (roles?: WalletRoleValueType[]) =>
  applyDecorators(
    SetMetadata(
      'wallet-roles',
      roles
        ? Array.isArray(roles)
          ? roles
          : [roles]
        : [WalletRole.ADMIN, WalletRole.READ, WalletRole.WRITE],
    ),
    UseGuards(WalletGuard),
  );
