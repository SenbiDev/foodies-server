import { Request, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartService } from './cart.service';
import { PutCartItemDTO } from './dto/putCartItemDTO';

@Controller('api')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get('/carts')
  async getAllCartItem(@Request() req) {
    const user = req.user;

    return this.cartService.index({ user });
  }

  @UseGuards(AuthGuard)
  @Put('/carts')
  async putCartItem(@Request() req, @Body() putCartItemDTO: PutCartItemDTO) {
    const { items } = putCartItemDTO;
    const userRef = req.userRef;

    return await this.cartService.update({ items, userRef });
  }
}
