import { Injectable } from '@nestjs/common';

import { Web3Listener } from '../../web3/listeners/web3.listener';
import { NetWeb3ServiceType } from '../../web3/interfaces/init-web3.type';
import { Erc20NetMethodType } from '../interfaces/erc20-method.interface';
import { Erc20Config } from '../config/erc20.config';
import { SubscribeErc20NetType } from '../interfaces/subscribe-erc20-net.interface';
import { QueueErc20 } from '../enums/queue-erc20';

@Injectable()
export class SubscribeService {
  /** Subscribe to web3 witch use this module (contract) */
  public readonly web3 = {} as NetWeb3ServiceType;

  /** contract methods with networks */
  public readonly erc20Methods = {} as Erc20NetMethodType;

  constructor(
    private readonly erc20Config: Erc20Config,
    private readonly web3Listener: Web3Listener,
  ) {
    /** Init web3 for all erc20 contracts (with subscribe to those or not) */
    this.initContractMethods();
  }

  protected initContractMethods(): void {
    for (const [net, isSubscribe] of Object.entries(
      this.erc20Config.networks,
    ) as SubscribeErc20NetType) {
      /** Init web3 */
      this.web3[net] = this.web3Listener.web3[net];

      /** Check event enums if we will subscribe to them */
      if (isSubscribe) {
        this.web3Listener.checkQueueEnum(
          this.erc20Config.erc20[net],
          Object.entries(QueueErc20),
        );
      }

      /** Get contract methods */
      this.erc20Methods[net] = this.web3Listener.listenContract(
        net,
        this.erc20Config.erc20[net],
        isSubscribe,
      );
    }
  }
}
