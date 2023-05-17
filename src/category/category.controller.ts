import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('api')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/categories')
  async getAllCategory() {
    return await this.categoryService.index();
  }
}
