import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    
@IsArray()
@ArrayMinSize(1)
@ValidateNested({each:true})
@Type(() => OrderItemDto)
items: OrderItemDto[]

}
