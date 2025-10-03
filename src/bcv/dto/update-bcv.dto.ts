import { PartialType } from '@nestjs/mapped-types';
import { CreateBcvDto } from './create-bcv.dto';

export class UpdateBcvDto extends PartialType(CreateBcvDto) {}
