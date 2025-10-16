import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleItem } from '../../sales/entities/sale-item.entity';
import { decimalTransformer } from 'src/common/transformers/decimal.transformer';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true ,default :null}) // 👈 código de barras único opcional
  barcode: string;


  @Column({ length: 150 })
  name: string;

   @Column('decimal', { precision: 10, scale: 2, transformer: decimalTransformer })
  priceUSD: number;

  @Column({ type: 'float', default: 0 })
  incremento: number; // porcentaje de ganancia, ej: 10, 20, etc.


  @Column('decimal', { precision: 12, scale: 2, transformer: decimalTransformer })
  priceBS: number;

  @Column('int', { default: 0 })
  stock: number;

  @Column({ nullable: true })
  image?: string;

  // Relación con sale items
  @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
  saleItems: SaleItem[];
}
