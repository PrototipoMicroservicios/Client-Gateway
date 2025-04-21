import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return 'Create un producto'
  }

  @Get()
  findAllProducts(){
    return 'Regresa varios productos'
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
