// bcv.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bcv} from './entities/bcv.entity';
import { BcvService } from './bcv.service';
import { BcvController } from './bcv.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [forwardRef(() => ProductsModule),TypeOrmModule.forFeature([Bcv])],
  controllers: [BcvController],
  providers: [BcvService],
  exports: [BcvService],
})
export class BcvModule {}
