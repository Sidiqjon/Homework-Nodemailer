import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  categoryId?: number;
}
