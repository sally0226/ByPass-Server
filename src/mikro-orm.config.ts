import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Migrator } from '@mikro-orm/migrations';
import {
  MySqlDriver,
  Options,
  ReflectMetadataProvider,
} from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { entities } from 'src/entities';

const configService = new ConfigService();
const logger = new Logger('MikroORM');

const MikroOrmConfig: Options = {
  logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  driver: MySqlDriver,
  extensions: [Migrator],
  host: configService.get('DB_HOST'),
  user: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  port: configService.get('DB_PORT'),
  dbName: configService.get('DB_NAME'),
  entities: entities,
  metadataProvider: ReflectMetadataProvider,
  debug: true,
};

export default MikroOrmConfig;
