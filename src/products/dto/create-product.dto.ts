import { IsNotEmpty, IsNumber, IsOptional, IsString, Min ,} from 'class-validator';

export class CreateProductDto {
 @IsOptional()
  @IsString()
  barcode?: string; 

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  priceUSD: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  image?: string;
}
