import { Controller, Get, Patch, Body } from '@nestjs/common';
import { BcvService } from './bcv.service';

@Controller('bcv')
export class BcvController {
  constructor(private readonly bcvService: BcvService) {}

  @Get()
  getRate() {
    return { rate: this.bcvService.getRate() };
  }

  @Patch()
  setRate(@Body('rate') rate: number) {
    return { rate: this.bcvService.setRate(rate) };
  }
}
