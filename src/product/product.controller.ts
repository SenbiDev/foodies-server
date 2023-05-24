import { Controller, Get, Post, DefaultValuePipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ParseIntPipe } from 'pipe/parse-int.pipe';
import { GetAllProductQueryParam } from './queryParam/getAllProductQueryParam';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getAllProduct(
    @Query('limit', new DefaultValuePipe(9), new ParseIntPipe()) limit: number,
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
    @Query() getAllProductQueryParam: GetAllProductQueryParam,
  ) {
    const { q, category = '', tags } = getAllProductQueryParam;

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
