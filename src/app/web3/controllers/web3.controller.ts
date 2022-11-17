import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MethodsEnum } from '../enums/methods.enum';
import { Network } from '../enums/network';
import { Erc20NetMethodType } from '../interfaces/erc20-method.interface';
import { NetWeb3ServiceType } from '../interfaces/init-web3.type';
import { Erc20NetType } from '../interfaces/subscribe-erc20-net.interface';
import { Web3Listener } from '../listeners/web3.listener';
import { MultiContractMethods } from '../services/multi-contract.service';
import { SubscribeService } from '../services/subscribe.service';

@ApiTags('web3')
@Controller('web3')
export class Web3Controller {
  contractMethods: any;
  constructor(
    private readonly web3Listener: Web3Listener,
    private readonly subscribeService: SubscribeService,
    private readonly multiContractMethods: MultiContractMethods
  ) {
    this.contractMethods = this.multiContractMethods.contractMethods;
  }
  @Post()
  createAccount(@Body() data: { network: Network }) {
    return this.web3Listener.web3[data.network].createAccount();
  }

  // @Get('decimals')
  // async getDecimals(@Query() data: { net: Erc20NetType }) {
  //   const methods: Erc20MethodInterface = this.subscribeService.erc20Methods[data.net];
  //   return methods.decimals().call();
  // }

  // @Post('transfer')
  // async sendTransfer(@Body() data: { net: Erc20NetType, recipient: string, amountStr: string }) {
  //   const methods: Erc20MethodInterface = this.subscribeService.erc20Methods[data.net];
  //   return methods.transfer(data.recipient, data.amountStr);
  // }

  @Post('transaction')
  sendTransaction(@Query() data: { 
    net: Erc20NetType,
    transaction: any,
  }) {
    return this.web3Listener.web3[data.net].sendTransaction(data.transaction);
  }

  @Post('request')
  async request (request: web3Request) {
    const contractMethods = {
      web3: this.web3Listener.web3,
      erc20: this.subscribeService.erc20Methods,
    }
    const data = request.data || [];
    const method = this.contractMethods[request.contract][request.net][request.method](...data); 
    let response; 

    if (request.type === ContractMethodType.nonpayable) {
      response = await contractMethods.web3[request.net].sendTransaction(method);//TODO: check estimate gas
    } else {
      response = await method.call();
    }

    return response;
  }
} 

interface web3Request {
  contract: Contract,
  method: string,
  net: Network,
  type: ContractMethodType, 
  data?: Array<any>,
}

enum ContractMethodType {
  view = 'view',
  nonpayable = 'nonpayable',
}

enum Contract {
  web3 = 'web3',
  erc20 = 'erc20'    
} 
