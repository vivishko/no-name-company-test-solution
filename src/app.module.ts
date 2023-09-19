import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './address/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveBlocksService } from './save-blocks/save-blocks.service';
import { AppDataSourceOptions } from '../config/typeorm';
import { Transaction } from './transaction/transaction.entity';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceOptions),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [AppController, AddressController],
  providers: [AppService, SaveBlocksService, TransactionService],
})
export class AppModule {}
