import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  hash: string;

  @Column()
  blockNumberHex: string;

  @Column()
  blockNumberDec: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;
}
