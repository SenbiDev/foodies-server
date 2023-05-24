import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Register } from './decorator/register.decorator';
import { Me } from './decorator/me.decorator';
import { LogoutInterceptor } from './interceptor/logout.interceptor';
import { AuthDTO } from './dto/authDTO';

@UsePipes(new ValidationPipe({ stopAtFirstError: true, transform: true }))
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Register() authDTO: AuthDTO) {
    const { full_name, email, password } = authDTO;
    
    return await this.authService.register({ full_name, email, password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authDTO: Omit<AuthDTO, 'full_name'>) {
    const { email } = authDTO;

    return await this.authService.login({ email });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Me() me) {
    return me;
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LogoutInterceptor)
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const user = req.user;

    await this.authService.logout({ user });
  }
}
