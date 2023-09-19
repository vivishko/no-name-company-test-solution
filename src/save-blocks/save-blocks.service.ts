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
    const lastDbBlockInDec = await this.transactionService.getLastBlockNumber();

    // console.log('lastDbBlockInDec = ', lastDbBlockInDec);

    // запросить номер последнего блока в сети сейчас
    const fetchResult = await getLastBlockNumber();
    const lastBlockInHex = fetchResult.result;
    const lastBlockInDec = parseInt(lastBlockInHex, 16);

    // console.log(
    //   'lastBlockInHex = ',
    //   lastBlockInHex,
    //   'lastBlockInDec = ',
    //   lastBlockInDec,
    // );

    // обработать пустую бд
    if (!lastDbBlockInDec) {
      this.logger.log('БД пустая');
      // записать в бд транзы из последнего блока
      await this.saveTrxsByBlockNumber(lastBlockInHex);
      this.logger.log('Были записаны транзакции последнего блока');
    } else {
      this.logger.log('БД не пустая');
      // создать массив с номерами отсутствующих в бд блоков
      const arr = [];
      for (let i = lastDbBlockInDec; i < lastBlockInDec; i++) {
        arr.push((i + 1).toString(16));
      }
      // console.log(arr);

      // вызывать функцию запроса данных о блоке и записи в бд
      // раз в какой-то промежуток
      const timerId = setInterval(async () => {
        if (arr.length < 1) {
          clearInterval(timerId);
        } else {
          await this.saveTrxsByBlockNumber(arr.shift());
          // console.log(arr);
        }
      }, 200);
      this.logger.log(
        'Запись транзакций будет выполняться с ',
        'определённым интервалом согласно рейтлимиту',
      );
    }

    this.logger.debug('Cron выполнен');
  }

  async saveTrxsByBlockNumber(blockNumInHex) {
    try {
      const newTrxs =
        await this.transactionService.getNewTrxsByBlockNumber(blockNumInHex);
      const insertedIds = await this.transactionService.insertTrxs(newTrxs);

      // output for checking
      if (insertedIds) {
        console.log(
          'insertedIdsCount для блока ',
          blockNumInHex,
          ' = ',
          insertedIds.length,
        );
      } else {
        console.log('insert операция неуспешна');
      }
    } catch (err) {
      console.log('catched an error: ', err);
    }
  }
}
