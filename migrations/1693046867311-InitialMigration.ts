import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialMigration1693046867311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'hash',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'blockNumberHex',
            type: 'varchar',
          },
          {
            name: 'blockNumberDec',
            type: 'int',
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'to',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction');
  }
}
