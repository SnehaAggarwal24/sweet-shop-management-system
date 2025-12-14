import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateSweetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsInt()
  @Min(0)
  quantity: number;
}
