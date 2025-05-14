import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  name: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  @IsNotEmpty()
  @IsString()
  address: string;
}
