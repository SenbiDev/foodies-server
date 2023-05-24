import { IsNotEmpty, IsNumber, Min, IsString } from "class-validator";

export class CreateOrderDTO {
  @Min(5000, { message: 'minimal delivery_fee adalah 5000 rupiah' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'delivery_fee harus bertipe number' }
  )
  @IsNotEmpty({ message: 'delivery_fee harus diisi' })
  delivery_fee: number;

  @IsString({ message: 'delivery_address harus bertipe string' })
  @IsNotEmpty({ message: 'delivery_address harus diisi' })
  delivery_address: string;
}
