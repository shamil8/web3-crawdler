import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Web3Config } from './config/web3.config';
import { ParserInfoEntity } from '../database/entity/parser-info.entity';
import { ParserInfoRepository } from './repositories/parser-info.repository';
import { Web3Listener } from './listeners/web3.listener';
import { RabbitModule } from '../rabbit/rabbit.module';
import { Web3Controller } from './controllers/web3.controller';
import { SubscribeService } from './services/subscribe.service';
import { Erc20Config } from './config/erc20.config';
import { MultiContractMethods } from './services/multi-contract.service';

@Module({
  imports: [
    ConfigModule,
    Logger,
    TypeOrmModule.forFeature([ParserInfoEntity]),
    RabbitModule,
  ],
  exports: [
    /** web3 listener */
    Web3Listener,
    SubscribeService,
  ],
  controllers: [Web3Controller],
  providers: [
    // configs
    Web3Config,

    MultiContractMethods,

    // configs
    Erc20Config,

    // repositories
    ParserInfoRepository,

    // listeners
    Web3Listener,

    SubscribeService,
  ],
})
export class Web3Module {}
