import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { object } from 'joi';
import { catchError, first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { error } from 'console';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct( @Body()CreateProductDto: CreateProductDto){
    return this.productsClient.send({cmd: 'create_product'}, CreateProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id:string) {
    try{
      const product = await firstValueFrom(
      this.productsClient.send({cmd: 'find_one'}, {id})
      );
      return product;
    } catch(error){
      throw new BadRequestException(error);
    }

  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string) {
    return this.productsClient.send({cmd: 'delete_product'}, {id})
      .pipe(
        catchError( error=> { throw new RpcException(error)})        
    )  
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id : number,
    @Body() updateProductDto: UpdateProductDto
  ) {

    return this.productsClient.send({cmd: 'update_product'}, {
      id,
      ...updateProductDto
    }).pipe(
      catchError( error=> { throw new RpcException(error)})
    )
  }
}
