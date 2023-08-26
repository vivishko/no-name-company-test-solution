import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  hash: string;

  @Column()
  blockNumber: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;
}
