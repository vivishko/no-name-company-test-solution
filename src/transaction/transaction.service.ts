import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { getBlockInfo } from '../helpers/fetchFunctions';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  /**
   *
   * @param blockNumber number of the block in hex
   * @returns an array of Transactions
   */
  async getNewTrxsByBlockNumber(blockNumber: string): Promise<Transaction[]> {
    // запрос на инфо о блоке
    const response = await getBlockInfo(blockNumber);
    const result = response.result;

    // console.log(result);

    // приведение к типу Transaction[]
    const trxs: Transaction[] = result.transactions.map((trx: any) => {
      // if (trx.to === null) {
      //   console.log(
      //     'block with trx.to === null information:',
      //     '\nblockNumberHex =',
      //     trx.blockNumber,
      //     '\nblockNumberDec = ',
      //     parseInt(trx.blockNumber, 16),
      //     '\nhash = ',
      //     trx.hash,
      //     '\nto = ',
      //     trx.to,
      //   );
      // }
      return {
        hash: trx.hash,
        blockNumberHex: trx.blockNumber,
        blockNumberDec: parseInt(trx.blockNumber, 16),
        from: trx.from,
        to: trx.to,
        value: trx.value,
      };
    });
    return trxs;
  }

  /**
   *
   * @returns hex number of the las block in eth network
   */
  async getLastBlockNumber(): Promise<number | undefined> {
    const lastBlockNumber = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('MAX(transaction.blockNumberDec)', 'max')
      .getRawOne();

    return lastBlockNumber?.max;
  }

  /**
   * insert trxs in a database
   * @param trxs Transaction or array of Transaction
   * @returns ids of inserted trxs
   */
  async insertTrxs(trxs: Transaction[] | Transaction): Promise<any[]> {
    const operationRes = await this.transactionsRepository.insert(trxs);
    return operationRes.identifiers;
  }
}
