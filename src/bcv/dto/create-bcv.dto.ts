import { IsNumber, Min } from 'class-validator';

export class CreateBcvDto {
    @IsNumber()
    @Min(0)
    rate: number;

}
