import { PartialType } from '@nestjs/mapped-types';
import { CreateBcvDto } from './create-bcv.dto';
import { IsNumber } from 'class-validator';

export class UpdateBcvDto extends PartialType(CreateBcvDto) {
    @IsNumber()
  rate: number;
}
