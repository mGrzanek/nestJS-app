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
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.orderService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData);
  }
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.orderService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.orderService.update(id, orderData);
    return { success: true };
  }
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.orderService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.orderService.remove(id);
    return { success: true };
  }
}
