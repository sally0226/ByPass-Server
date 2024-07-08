import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { OAuthUser } from 'src/common/types/oauth.type';

export const OAuthLoginUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{
      user: OAuthUser;
    }>();
    return request.user;
  },
);
