import { Controller, Get, Patch, Body,Post } from '@nestjs/common';
import { BcvService } from './bcv.service';
import { UpdateBcvDto } from './dto/update-bcv.dto';

@Controller('bcv')
export class BcvController {
  constructor(private readonly bcvService: BcvService) {}

   @Get()
  async getRate() {
    const rate = await this.bcvService.getRate();
    return { rate };
  }
  @Patch()
  setRate(@Body('rate') rate: number) {
    return { rate: this.bcvService.setRate(rate) };
  }

    @Post()
  async updateRate(@Body() dto: UpdateBcvDto) {
    const rate = await this.bcvService.updateBcvRate(dto);
    return { rate };
  }
}
