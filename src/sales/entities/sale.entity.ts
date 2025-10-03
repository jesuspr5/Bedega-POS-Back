import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleItem } from './sale-item.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  totalUSD: number;

  @Column('decimal', { precision: 12, scale: 2 })
  totalBS: number;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true ,eager: true })
  items: SaleItem[];
}
