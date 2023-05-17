import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryDTO } from './queryDto';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getAllProduct(@Query() queryParam: QueryDTO) {
    const { query, limit = 9, page = 1, category = '', tags } = queryParam;
    return await this.productService.index({
      query,
      limit,
      page,
      category,
      tags,
    });
  }

  @Post('/products')
  async createProduct() {
    // return await this.productService.create();
    await this.productService.create();
  }
}
