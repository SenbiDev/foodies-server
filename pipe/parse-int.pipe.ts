import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, { data }: ArgumentMetadata): number {    
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`${data} harus bertipe number`);
    }
    return val;
  }
}