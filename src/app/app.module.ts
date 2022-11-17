import { Logger, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    Logger,
    DatabaseModule,
    Web3Module,
    RabbitModule,
  ],
})
export default class AppModule {}
