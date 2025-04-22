import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(){
    return 'Create un producto'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return 'Regresa un producto' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string) {
    return 'Elimina un registo ' + id;
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id : string,
    @Body() Body: any
  ) {
    return 'Actualiza un registo ' + id
  }
}
