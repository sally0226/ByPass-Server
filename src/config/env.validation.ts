import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  Max,
  Min,
  validateSync,
  IsString,
  MinLength,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @MinLength(1)
  KAKAO_CLIENT_ID: string;

  @IsString()
  @MinLength(1)
  KAKAO_OAUTH_CALLBACK_URL: string;

  @IsString()
  @MinLength(1)
  CLIENT_REDIRECT_URL: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_PRIVATE_KEY: string;

  @IsString()
  JWT_PUBLIC_KEY: string;
}

export function envValidate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
