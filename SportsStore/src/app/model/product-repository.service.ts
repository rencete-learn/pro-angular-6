import { Injectable } from '@angular/core';

import { StaticDatasourceService } from "./static-datasource.service";
import { Product } from './product.model';

@Injectable()
export class ProductRepositoryService {
  private products : Product[];
  private categories : string[];

  constructor(private ds : StaticDatasourceService) { 
    ds.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data.map(item => item.category)
        .filter((val, ind, arr) => arr.indexOf(val) == ind)
        .sort();
    });
  }

  getProducts(category: string = null) : Product[] {
    return this.products.filter(p => p.category == category);
  }

  getProduct(id: number) : Product {
    return this.products.find(p => p.id == id);
  }
  
  getCategories() : string[] {
    return this.categories;
  }
}
