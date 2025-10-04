import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleItem } from './sale-item.entity';
import { decimalTransformer } from 'src/common/transformers/decimal.transformer';


@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;


@Column('decimal', { precision: 12, scale: 2, transformer: decimalTransformer })
totalUSD: number;

@Column('decimal', { precision: 12, scale: 2, transformer: decimalTransformer })
totalBS: number;


  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true ,eager: true })
  items: SaleItem[];
}
