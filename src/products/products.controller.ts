import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
  @Delete('/:id')
  public removeOne(@Param('id') id: string) {
    this.productsService.removeOne(id);
    return { success: true };
  }
}
