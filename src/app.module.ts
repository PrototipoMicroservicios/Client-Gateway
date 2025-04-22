import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE,envs } from './config';
import { ProductsController } from './products/products.controller';
import { OPTIONAL_DEPS_METADATA } from '@nestjs/common/constants';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicrosrvicePort,
        },
      },
    ]),
  ]
})
export class AppModule {}
