import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({ example: 'product-uuid-123', description: '商品ID' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 1, description: '数量', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}
