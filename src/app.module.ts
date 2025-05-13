import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE,envs } from './config';
import { ProductsController } from './products/products.controller';
import { OPTIONAL_DEPS_METADATA } from '@nestjs/common/constants';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
})
export class AppModule {}
