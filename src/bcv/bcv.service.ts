// bcv.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class BcvService {
  private rate = 163;

  constructor(
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  getRate() {
    return this.rate;
  }

  async setRate(newRate: number) {
    this.rate = newRate;

    // Recalcular priceBS de todos los productos
    const products = await this.productsService.findAll();
    for (const product of products) {
      product.priceBS = Math.round(product.priceUSD * this.rate);
      await this.productsService.update(product.id, { priceUSD: product.priceUSD });
    }

    return this.rate;
  }
}
