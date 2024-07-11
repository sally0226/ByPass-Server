import { InternalServerErrorException } from '@nestjs/common';

import { environment, Environment } from './env.validation';

export const getNodeEnv: Environment = (() => {
  const env = process.env.NODE_ENV;
  if (!environment.includes(env)) {
    throw new InternalServerErrorException('Unknown NODE_ENV');
  }
  return env;
})();
