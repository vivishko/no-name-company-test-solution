import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { getLastBlockNumber } from '../helpers/fetchFunctions';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class SaveBlocksService {
  private readonly logger = new Logger(SaveBlocksService.name);

  constructor(private readonly transactionService: TransactionService) {
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    cron.schedule('* * * * *', () => {
      this.saveNewBlocks();
    });
  }

  private async saveNewBlocks() {
    // проверить номер последнего блока в бд
    const lastDbBlockInHex = await this.transactionService.getLastBlockNumber();

    // запросить номер последнего блока в сети сейчас
    const fetchResult = await getLastBlockNumber();
    const lastBlockInHex = fetchResult.result;
    const lastBlockInDec = parseInt(lastBlockInHex, 16);

    // обработать пустую бд
    if (lastDbBlockInHex === undefined) {
      // записать в бд транзы из последнего блока
      const newTrxs =
        await this.transactionService.getNewTrxsByBlockNumber(lastBlockInHex);
      const insertedIds = await this.transactionService.insertTrxs(newTrxs);

      // вывод
      if (insertedIds) {
        console.log(insertedIds);
      } else {
        console.log('insert операция неуспешна');
      }
    } else {
      // преобразовать lastDbBlockInHex в десятичную
      const lastDbBlockInDec = parseInt(lastDbBlockInHex, 16);

      // вычислить разницу в количестве блоков
      const diff = lastBlockInDec - lastDbBlockInDec;

      // выполнить рассчёт таймаутов между запросами согласно рейтлимиту
      // выполнить запрос на инфо о блоке по таймауту
      for (let i = 0; i < diff; i++) {
        const timeoutMs = i < 5 ? 250 : 200;
        setTimeout(async () => {
          const blockNum = lastBlockInDec + i;
          const blockTrxs =
            await this.transactionService.getNewTrxsByBlockNumber(
              blockNum.toString(16),
            );
          console.log('blockTrxs = \n', blockTrxs);
          const insertedIds =
            await this.transactionService.insertTrxs(blockTrxs);
          console.log('insertedIds = \n', insertedIds);
        }, timeoutMs);
      }
    }

    this.logger.debug('Cron Job выполнен');
  }
}
