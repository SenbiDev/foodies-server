import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [CategoryModule, TagModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
