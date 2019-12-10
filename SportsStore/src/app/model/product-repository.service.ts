import { Injectable } from '@angular/core';

import { RestDatasourceService } from "./rest-datasource.service";
import { Product } from './product.model';

@Injectable()
export class ProductRepositoryService {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private ds : RestDatasourceService) { 
    ds.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data.map(item => item.category)
        .filter((val, ind, arr) => arr.indexOf(val) == ind)
        .sort();
    });
  }

  getProducts(category: string = null) : Product[] {
    return this.products.filter(p => p.category == category || category == null);
  }

  getProduct(id: number) : Product {
    return this.products.find(p => p.id == id);
  }
  
  getCategories() : string[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.ds.saveProduct(product).subscribe(p => this.products.push(p));
    } else {
      this.ds.updateProduct(product)
        .subscribe(p => this.products.splice(this.products.findIndex(x => x.id == p.id), 1, p));
    }
  }

  deleteProduct(id: number) {
    this.ds.deleteProduct(id)
      .subscribe(p => this.products.splice(this.products.findIndex(x => x.id == id), 1));
  }
}
