import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './address/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveBlocksService } from './save-blocks/save-blocks.service';
import { AppDataSource } from '../config/typeorm';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource as any)],
  controllers: [AppController, AddressController],
  providers: [AppService, SaveBlocksService, TransactionService],
})
export class AppModule {}
