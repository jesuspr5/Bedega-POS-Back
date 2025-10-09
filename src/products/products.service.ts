import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BcvService } from '../bcv/bcv.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private readonly bcvService: BcvService,
  ) {}

  // Recalcula priceBS de todos los productos cuando cambia la tasa BCV
  async recalculateAllPriceBS(newRate: number) {
    const products = await this.productRepo.find();
    for (const p of products) {
      const priceUSDNumber =
        typeof p.priceUSD === 'string' ? parseFloat(p.priceUSD) : p.priceUSD;
      p.priceBS = Number((priceUSDNumber * newRate).toFixed(2));
      await this.productRepo.save(p);
    }
  }

  async create(dto: CreateProductDto) {
    const bcvRate = await this.bcvService.getRate();
    const priceUSDNumber = typeof dto.priceUSD === 'string' ? parseFloat(dto.priceUSD) : dto.priceUSD;
    const product = this.productRepo.create({
      ...dto,
      priceBS: Math.round(priceUSDNumber * bcvRate), // calcular al crear
    });
    return this.productRepo.save(product);
  }

async findAll() {
  const rate = await this.bcvService.getRate();
  const products = await this.productRepo.find();
  return products.map(p => ({
    id: p.id,
    name: p.name,
    priceUSD: p.priceUSD,
    priceBS: Number((p.priceUSD * rate).toFixed(2)),
    stock: p.stock,
    image: p.image,
    barcode: p.barcode,   // 👈 aseguramos que viaje al frontend
  }));
}

 async findOne(id: number) {
  const rate = await this.bcvService.getRate();
  const product = await this.productRepo.findOneBy({ id });
  if (!product) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  return {
    id: product.id,
    name: product.name,
    priceUSD: product.priceUSD,
    priceBS: Number((product.priceUSD * rate).toFixed(2)),
    stock: product.stock,
    image: product.image,
    barcode: product.barcode,  // 👈 también aquí
  };
}

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.priceUSD !== undefined) product.priceUSD = dto.priceUSD;
    if (dto.stock !== undefined) product.stock = dto.stock;
    if (dto.barcode !== undefined) product.barcode = dto.barcode;
    if (dto.image !== undefined) product.image = dto.image;

    const rate = await this.bcvService.getRate();
    const priceUSDNumber =
      typeof product.priceUSD === 'string' ? parseFloat(product.priceUSD) : product.priceUSD;
    product.priceBS = Number((priceUSDNumber * rate).toFixed(2));

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return this.productRepo.remove(product);
  }
}
