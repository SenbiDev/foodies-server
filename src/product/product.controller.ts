import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProductQueryParam } from './queryParam/getAllProductQueryParam';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getAllProduct(
    @Query() getAllProductQueryParam: GetAllProductQueryParam,
  ) {
    const {
      q,
      limit = 9,
      page = 1,
      category = '',
      tags,
    } = getAllProductQueryParam;

    return await this.productService.index({
      q,
      limit,
      page,
      category,
      tags,
    });
  }

  @Post('/products')
  async createProduct() {
    return await this.productService.create();
  }
}
