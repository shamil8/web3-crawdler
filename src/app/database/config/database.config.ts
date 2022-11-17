import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const DatabaseConfig = (configService: ConfigService): DataSourceOptions => ({
  namingStrategy: new SnakeNamingStrategy(),
  name: 'default',
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/app/database/entity/*.entity.js'],
  synchronize: false,
  logging: false,
  migrationsRun: true,
});

export default DatabaseConfig;
