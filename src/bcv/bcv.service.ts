// bcv.service.ts
import { Injectable, forwardRef, Inject, NotFoundException  } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcv } from './entities/bcv.entity';
import { UpdateBcvDto } from './dto/update-bcv.dto';

@Injectable()
export class BcvService {
  private rate = 163;

  constructor(
    @InjectRepository(Bcv)
    private readonly settingsRepo: Repository<Bcv>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  
 async getRate(): Promise<number> {
    const bcv = await this.settingsRepo.findOne({ where: { key: 'bcvRate' } });
    if (!bcv) throw new NotFoundException('Tasa BCV no encontrada');
    return Number(bcv.value);
  }

  async setRate(newRate: number) {
    this.rate = newRate;

    const products = await this.productsService.findAll();
    for (const product of products) {
       const incremento = product.incremento ?? 0;
      product.priceBS = Math.round(product.priceUSD * this.rate * (1 + incremento / 100));
      await this.productsService.update(product.id, { priceUSD: product.priceUSD });
    }

    return this.rate;
  }
  
  async updateBcvRate(dto: UpdateBcvDto): Promise<number> {
    let setting = await this.settingsRepo.findOne({ where: { key: 'bcvRate' } });

    if (!setting) {
      setting = this.settingsRepo.create({
        key: 'bcvRate',
        value: dto.rate,
      });
    } else {
      setting.value = dto.rate;
    }

    await this.settingsRepo.save(setting);
    await this.setRate(dto.rate);
    return Number(setting.value);
  }

}
