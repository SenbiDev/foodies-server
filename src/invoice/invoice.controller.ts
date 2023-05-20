import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('api')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/invoices/:orderId')
  async getInvoiceByOrderId(@Param('orderId') orderId: string) {
    return await this.invoiceService.show({ orderId });
  }
}
