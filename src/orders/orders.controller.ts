import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get('/')
  getAll(): any {
    return this.orderService.getAll();
  }
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.orderService.getById(id);
  }
}
