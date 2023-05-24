import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const Register = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.body;
    const password = bcrypt.hashSync(user.password, 10);
    
    return { full_name: user.full_name, email: user.email, password };
  },
);