import { Erc20NetType } from './subscribe-erc20-net.interface';

export type Erc20NetMethodType = {
  [key in Erc20NetType]: any;
};
