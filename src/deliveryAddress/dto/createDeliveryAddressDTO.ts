import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';


export class CreateDeliveryAddressDTO {
  @MaxLength(255, { message: 'Panjang nama alamat maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang nama alamat minimal 3 karakter' })
  @IsString({ message: 'Nama alamat harus bertipe string' })
  @IsNotEmpty({ message: 'Nama alamat harus diisi' })
  nama: string;

  @MaxLength(255, { message: 'Panjang provinsi maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang provinsi minimal 3 karakter' })
  @IsString({ message: 'Provinsi harus bertipe string' })
  @IsNotEmpty({ message: 'Provinsi harus diisi' })
  provinsi: string;

  @MaxLength(255, { message: 'Panjang kabupaten maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang kabupaten minimal 3 karakter' })
  @IsString({ message: 'Kabupaten harus bertipe string' })
  @IsNotEmpty({ message: 'Kabupaten harus diisi' })
  kabupaten: string;

  @MaxLength(255, { message: 'Panjang kecamatan maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang kecamatan minimal 3 karakter' })
  @IsString({ message: 'Kecamatan harus bertipe string' })
  @IsNotEmpty({ message: 'Kecamatan harus diisi' })
  kecamatan: string;

  @MaxLength(255, { message: 'Panjang kelurahan maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang kelurahan minimal 3 karakter' })
  @IsString({ message: 'Kelurahan harus bertipe string' })
  @IsNotEmpty({ message: 'Kelurahan harus diisi' })
  kelurahan: string;

  @MaxLength(1000, { message: 'Panjang detail maksimal 1000 karakter' })
  @MinLength(3, { message: 'Panjang detail minimal 3 karakter' })
  @IsString({ message: 'Detail harus bertipe string' })
  @IsNotEmpty({ message: 'Detail harus diisi' })
  detail: string;
}
