import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class AuthDTO {
  
  @MaxLength(255, { message: 'Panjang nama maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang nama minimal 3 karakter' })
  @IsString({ message: 'Nama harus bertipe string' })
  @IsNotEmpty({ message: 'Nama harus diisi' })
  full_name: string;

  @MaxLength(255, { message: 'Panjang email maksimal 255 karakter' })
  @IsEmail(undefined, { message: 'Email harus valid' })
  @IsString({ message: 'Email harus bertipe string' })
  @IsNotEmpty({ message: 'Email harus diisi' })
  email: string;

  @MaxLength(255, { message: 'Panjang password maksimal 255 karakter' })
  @MinLength(3, { message: 'Panjang password minimal 3 karakter' })
  @IsString({ message: 'Password harus bertipe string' })
  @IsNotEmpty({ message: 'Password harus diisi' })
  password: string;
}
