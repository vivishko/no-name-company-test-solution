import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Transaction } from '../src/transaction/transaction.entity';
import { InitialMigration1693046867311 } from '../migrations/1693046867311-InitialMigration';

dotenv.config();

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(process.env.DATABASE_PORT),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [Transaction],
  synchronize: false,
  // logging: true, // выводит всё, в том числе queries
  logging: ['error'], // выводить только ошибки
  migrations: [InitialMigration1693046867311],
};

const AppDataSource = new DataSource(AppDataSourceOptions);
export default AppDataSource;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
