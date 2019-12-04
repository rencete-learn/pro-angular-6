import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../model/product-repository.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private repository : ProductRepositoryService) { }

  ngOnInit() {
  }

  getProducts() {
    return this.repository.getProducts();
  }
  
  getCategories() {
    return this.repository.getCategories();
  }

}
