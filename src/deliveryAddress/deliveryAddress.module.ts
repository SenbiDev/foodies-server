import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './deliveryAddress.service';
import { DeliveryAddressController } from './deliveryAddress.controller';

@Module({
  providers: [DeliveryAddressService],
  controllers: [DeliveryAddressController],
  exports: [DeliveryAddressService],
})
export class DeliveryAddressModule {}
