import { Controller, Get, Res } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
// import { getLastBlockNumber, getBlockInfo } from '../helpers/fetchFunctions';
import { Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getMostChanged(@Res() res: Response) {
    try {
      // запросить инфу о n транзакций из последних 100 блоков
      const trxs = await this.transactionService.getTrxsFromLastBlocks();

      if (!trxs.length) {
        return res
          .status(400)
          .json({ message: 'Array of transactions is empty!' });
      } else {
        // выписать из каждой из них адреса кошельков - from и to - в мапу с обработкой
        const walletChanges: { [key: string]: bigint } = {};
        for (let i = 0; i < trxs.length; i++) {
          // обработка from
          if (walletChanges.hasOwnProperty(trxs[i].from)) {
            walletChanges[trxs[i].from] -= BigInt(trxs[i].value);
          } else {
            walletChanges[trxs[i].from] = -BigInt(trxs[i].value);
          }
          // обработка to
          if (walletChanges.hasOwnProperty(trxs[i].to)) {
            walletChanges[trxs[i].to] += BigInt(trxs[i].value);
          } else {
            walletChanges[trxs[i].to] = BigInt(trxs[i].value);
          }
        }

        // const maxValue = 0;
        // const maxWallet = null;
        // for (const [wallet, value] of Object.entries(walletChanges)) {
        //   if (Math.abs(value) > maxValue) {
        //     maxWallet = wallet;
        //     maxValue = Math.abs(value);
        //   }
        // }
        const entries = Object.entries(walletChanges);
        for (const [wallet, value] of entries) {
          walletChanges[wallet] = value < 0n ? -value : value;
        }
        const sortedEntries = entries.sort(([, value1], [, value2]) => {
          if (value1 < value2) return 1; // если value1 меньше value2, вернуть 1
          if (value1 > value2) return -1; // если value1 больше value2, вернуть -1
          return 0; // если value1 равно value2, вернуть 0v
        });
        const top5Entries = sortedEntries.slice(0, 5);
        // const top5Wallets: { [key: string]: bigint } =
        // Object.fromEntries(top5Entries);
        const top5Wallets = JSON.stringify(top5Entries, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        );

        return res.status(201).json({
          message: 'The wallet with max value has been found',
          wallets: top5Wallets,
        });

        // return res.status(201).json({
        //   message: 'The wallet with max value has been found',
        //   value: maxWallet,
        // });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Upload failed', error: err.message });
    }
  }
}
