import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }
  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }
  public removeOne(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    const newProduct = { ...productData, id: uuidv4() };
    return this.prismaService.product.create({
      data: newProduct,
    });
  }
  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }
}
