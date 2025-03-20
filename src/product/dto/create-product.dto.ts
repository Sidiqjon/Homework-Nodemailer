import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The category ID of the product',
    example: 1,
    required: false,
  })
  @IsOptional()
  categoryId?: number;
}
