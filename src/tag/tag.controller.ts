import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/tags')
  async getAllTag() {
    return await this.tagService.index();
  }
}
