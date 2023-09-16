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

    // приведение к типу Transaction[]
    const trxs: Transaction[] = result.transactions.filter((trx: any) => {
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

  async getLastBlockNumber(): Promise<string | undefined> {
    const lastBlockNumber = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('MAX(transaction.blockNumberDec)', 'max')
      .getRawOne();

    return lastBlockNumber?.max;
  }

  async insertTrxs(trxs: Transaction[] | Transaction): Promise<any[]> {
    const operationRes = await this.transactionsRepository.insert(trxs);
    return operationRes.identifiers;
  }
}
