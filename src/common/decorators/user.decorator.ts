import {
  ExecutionContext,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user == null) {
      throw new UnauthorizedException();
    }
    return request.user;
  },
);
