import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerConfig } from './config/logger.config';

@Module({
  imports: [ConfigModule],
  providers: [
    // configs
    LoggerConfig,
  ],
})
export class LoggerModule {}
