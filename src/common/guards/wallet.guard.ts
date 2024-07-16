import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class WalletGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly walletService: WalletService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const mapRoles = this.reflector.get<string[]>(
      'wallet-roles',
      context.getHandler(),
    );
    if (!mapRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const walletId = request.params.id;

    try {
      const walletUser = await this.walletService.findWalletUser(
        user,
        walletId,
      );
      const hasValidRole = mapRoles.some((role) =>
        walletUser.role?.includes(role),
      );
      if (!hasValidRole) {
        throw new ForbiddenException('접근 권한이 없습니다.');
      }
      return true;
    } catch (e) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
  }
}
