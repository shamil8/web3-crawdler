import { Extension } from 'web3-core';
import { formatters } from 'web3-core-helpers';

import { transactionFormatter } from './transaction.formatter';
import { blockFormatter } from './block.formatter';
import { isString } from 'libs/crypto-utils/src/functions/core.util';

/** Extends web3 methods */
export const extensionFormatter = {
  property: 'eth',
  methods: [
    {
      name: 'getTransaction',
      call: 'eth_getTransactionByHash',
      params: 1,
      inputFormatter: [null],
      outputFormatter: transactionFormatter,
    },
    {
      name: 'getBlock',
      call: (args: any): string => {
        return isString(args[0]) && args[0].indexOf('0x') === 0
          ? 'eth_getBlockByHash'
          : 'eth_getBlockByNumber';
      },
      params: 2,
      inputFormatter: [
        formatters.inputBlockNumberFormatter,
        (blockNumber: string | number): boolean => {
          return !!blockNumber;
        },
      ],
      outputFormatter: blockFormatter,
    },
  ],
} as unknown as Extension;
