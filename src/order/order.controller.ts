import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/createOrderDTO';

@Controller('api')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get('/orders')
  async getAllOrder() {
    return await this.orderService.index();
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
