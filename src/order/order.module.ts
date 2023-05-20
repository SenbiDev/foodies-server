import { Module } from '@nestjs/common';
import { DeliveryAddressModule } from 'src/deliveryAddress/deliveryAddress.module';
import { CounterModule } from 'src/counter/counter.module';
import { CartModule } from 'src/cart/cart.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [CounterModule, DeliveryAddressModule, CartModule, InvoiceModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
