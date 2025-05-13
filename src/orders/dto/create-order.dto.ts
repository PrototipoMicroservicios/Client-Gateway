import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateOrderDto {


  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;


}