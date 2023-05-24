import { IsNotEmpty, MinLength, Min, IsString, IsNumber, IsObject, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Product {
  @IsString({ message: '_id harus bertipe string' })
  @IsNotEmpty({ message: '_id harus diisi' })
  _id: string;

  @IsString({ message: 'image_url harus bertipe string' })
  @IsNotEmpty({ message: 'image_url harus diisi' })
  image_url: string;

  @MinLength(2, { message: 'minimal panjang name adalah 2' })
  @IsString({ message: 'name harus bertipe string' })
  @IsNotEmpty({ message: 'name harus diisi' })
  name: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'price harus bertipe number' }
  )
  @IsNotEmpty({ message: 'price harus diisi' })
  price: number;
}

class Items {
  @ValidateNested({ each: true })
  @IsObject({ message: 'product harus bertipe object' })
  @IsNotEmpty({ message: 'product harus diisi' })
  @Type(() => Product)
  product: Product;

  @Min(1, { message: 'minimal qty adalah 1' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'qty harus bertipe number' }
  )
  @IsNotEmpty({ message: 'qty harus diisi' })
  qty: number;
}

export class PutCartItemDTO {
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'minimal panjang array items harus 1', always: true})
  @IsArray({ message: 'items harus bertipe array' })
  @IsNotEmpty({ message: 'items harus diisi' })
  @Type(() => Items)
  items: Items[];
}
