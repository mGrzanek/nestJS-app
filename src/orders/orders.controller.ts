import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get('/')
  getAll(): any {
    return this.orderService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.orderService.getById(id);
    if (!order) throw new NotFoundException('Product not found');
    return order;
  }
  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData);
  }
  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.orderService.getById(id))
      throw new NotFoundException('Order not found');
    this.orderService.update(id, orderData);
    return { success: true };
  }
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.orderService.getById(id))
      throw new NotFoundException('Product not found');
    this.orderService.remove(id);
    return { success: true };
  }
}
