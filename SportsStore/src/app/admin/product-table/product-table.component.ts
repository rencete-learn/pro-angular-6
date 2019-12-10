import { Component } from '@angular/core';
import { Observable, of } from "rxjs";

import { ProductRepositoryService } from 'src/app/model/product-repository.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  public displayedColumns: string[] = ['id', 'name', 'category', 'price', 'buttons'];

  constructor(private repository: ProductRepositoryService) { }

  getProducts(): Observable<Product[]> {
    return of(this.repository.getProducts());
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
