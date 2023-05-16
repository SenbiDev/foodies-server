import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getAllProduct() {
    return await this.productService.index();
  }
}
