import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }
  public getById(id: Product['id']): Product | null {
    return db.products.find((product) => product.id === id);
  }
  public removeOne(id: Product['id']): void {
    db.products = db.products.filter((product) => product.id !== id);
  }
}
