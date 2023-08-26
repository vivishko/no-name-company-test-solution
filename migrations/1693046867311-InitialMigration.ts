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
            name: 'blockNumber',
            type: 'string',
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
