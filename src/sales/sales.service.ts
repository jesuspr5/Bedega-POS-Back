import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity'; // asumimos que ya tienes products

import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly dataSource: DataSource, // para manejar transacciones
  ) {}

   async checkout(createSaleDto: CreateSaleDto) {
    const { items } = createSaleDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('El carrito está vacío');
    }

    return await this.dataSource.transaction(async (manager) => {
      let totalUSD = 0;
      let totalBS = 0;

      const saleItems: SaleItem[] = [];

      for (const item of items) {
        const product = await manager.findOne(Product, { where: { id: item.productId } });

        if (!product) {
          throw new NotFoundException(`Producto con id ${item.productId} no existe`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(`Stock insuficiente para ${product.name}`);
        }

        // Descontar stock
        product.stock -= item.quantity;
        await manager.save(product);

        // Crear item de venta (NO se guarda aún, cascade lo hará)
        const saleItem = this.saleItemRepository.create({
          productId: product.id,
          name: product.name,
          quantity: item.quantity,
          priceUSD: product.priceUSD,
          priceBS: product.priceBS,
        });

        saleItems.push(saleItem);

        // Calcular totales
        totalUSD += product.priceUSD * item.quantity;
        totalBS += (product.priceBS ?? 0) * item.quantity;
      }

      // Crear y guardar la venta junto con los items
      const sale = this.saleRepository.create({
        date: new Date(),
        totalUSD,
        totalBS,
        items: saleItems, // 🔹 gracias a cascade, guarda los SaleItem automáticamente
      });

      return await manager.save(sale);
    });
  }
    async findAll(): Promise<Sale[]> {
    try {
      return await this.saleRepository.find({
        relations: ['items'],
        order: { date: 'DESC' }, // 🔹 ordena las ventas de más reciente a antigua
      });
    } catch (error) {
      throw new Error('Error al obtener ventas: ' + error.message);
    }
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!sale) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return sale;
  }
}
