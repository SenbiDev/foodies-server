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
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/authDTO';

@UsePipes(new ValidationPipe({ stopAtFirstError: true, transform: true }))
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authDTO: AuthDTO) {
    const { full_name, email, password } = authDTO;
    return await this.authService.register({ full_name, email, password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authDTO: Omit<AuthDTO, 'full_name'>) {
    const { email, password } = authDTO;
    return await this.authService.login({ email, password });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const user = req.user;
    await this.authService.logout({ user });
  }
}
