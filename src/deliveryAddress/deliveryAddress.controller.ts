import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeliveryAddressService } from './deliveryAddress.service';
import { CreateDeliveryAddressDTO } from './dto/createDeliveryAddressDTO';

@Controller('api')
export class DeliveryAddressController {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/delivery-addresses')
  async index(@Request() req) {
    const user = req.user;

    return await this.deliveryAddressService.index({ user });
  }

  @UseGuards(AuthGuard)
  @Post('/delivery-addresses')
  async createDeliveryAddress(
    @Request() req,
    @Body() createDeliveryAddressDTO: CreateDeliveryAddressDTO,
  ) {
    const userRef = req.userRef;

    const { nama, provinsi, kabupaten, kecamatan, kelurahan, detail } =
      createDeliveryAddressDTO;

    return await this.deliveryAddressService.create({
      nama,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      detail,
      userRef,
    });
  }
}
