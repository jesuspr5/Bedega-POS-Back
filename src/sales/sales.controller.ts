import { Controller, Post, Body, Get, Param , UseGuards} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



//@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('checkout')
  checkout(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.checkout(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }
}
