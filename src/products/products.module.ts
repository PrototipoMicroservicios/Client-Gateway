import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [ 
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,

        },
      },
    ]),
    

  ]
})
export class ProductsModule {}
