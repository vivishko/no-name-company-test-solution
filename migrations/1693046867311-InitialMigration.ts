import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialMigration1693046867311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question',
        columns: [
          {
            name: 'hash',
            type: 'string',
            isPrimary: true,
          },
          {
            name: 'blockNumberHex',
            type: 'string',
          },
          {
            name: 'blockNumberDec',
            type: 'number',
          },
          {
            name: 'from',
            type: 'string',
          },
          {
            name: 'to',
            type: 'string',
          },
          {
            name: 'value',
            type: 'string',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question');
  }
}
