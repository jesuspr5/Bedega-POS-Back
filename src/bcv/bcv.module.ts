// bcv.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { BcvService } from './bcv.service';
import { BcvController } from './bcv.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  controllers: [BcvController],
  providers: [BcvService],
  exports: [BcvService],
})
export class BcvModule {}
