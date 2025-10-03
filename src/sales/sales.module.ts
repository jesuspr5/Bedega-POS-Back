import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity'; // importa la entity correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, Product]), // 🔑 importante
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
