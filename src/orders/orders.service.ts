import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }
  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const newOrder = { ...orderData, id: uuidv4() };
    return this.prismaService.order.create({
      data: newOrder,
    });
  }
  public update(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: orderData,
    });
  }
  public remove(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
