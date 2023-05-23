import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounterModule } from './counter/counter.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeliveryAddressModule } from './deliveryAddress/deliveryAddress.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: {
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
      },
    }),
    CounterModule,
    UserModule,
    AuthModule,
    DeliveryAddressModule,
    ProductModule,
    CategoryModule,
    TagModule,
    CartModule,
    OrderModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
