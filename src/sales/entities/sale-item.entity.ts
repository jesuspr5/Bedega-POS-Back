import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,JoinColumn} from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('sale_items')
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceUSD: number;

  @Column('decimal', { precision: 12, scale: 2 })
  priceBS: number;

  @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'saleId' })
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.saleItems,{ eager: true })
   @JoinColumn({ name: 'productId' })
  product: Product;
}
