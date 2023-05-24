import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const Me = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    return request.user ||
      (() => { throw new NotFoundException('anda tidak login atau token kedaluwarsa!') })();
  },
);