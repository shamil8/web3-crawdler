import { Injectable } from "@nestjs/common";
import { Web3Listener } from "../listeners/web3.listener";
import { SubscribeService } from "./subscribe.service";

@Injectable()
export class MultiContractMethods {
  constructor(private readonly web3Listener: Web3Listener, private readonly subscribeService: SubscribeService) {}
  contractMethods = {
    web3: this.web3Listener.web3,
    erc20: this.subscribeService.erc20Methods,
  }
}