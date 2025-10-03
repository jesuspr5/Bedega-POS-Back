import { Module ,forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { BcvModule } from '../bcv/bcv.module'; // 👈 importa tu módulo


@Module({
  imports: [TypeOrmModule.forFeature([Product]),
 forwardRef(() => BcvModule),], // 👈 agrega el módulo aquí
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
