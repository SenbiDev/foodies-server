import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { ParseIntPipe } from 'pipe/parse-int.pipe';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [CategoryModule, TagModule],
  providers: [ProductService, ParseIntPipe],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
