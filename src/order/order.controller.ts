import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/createOrderDTO';

@UsePipes(new ValidationPipe({ stopAtFirstError: true, transform: true }))
@Controller('api')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get('/orders')
  async getAllOrder(@Request() req) {
    const user = req.user;

    return await this.orderService.index({ user });
  }

  @UseGuards(AuthGuard)
  @Post('/orders')
  async createOrder(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const user = req.user;
    const userRef = req.userRef;
    const { delivery_fee, delivery_address } = createOrderDTO;

    return await this.orderService.create({
      delivery_fee,
      delivery_address,
      user,
      userRef,
    });
  }
}
