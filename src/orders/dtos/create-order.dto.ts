import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  client: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  @IsString()
  @IsNotEmpty()
  address: string;
}
