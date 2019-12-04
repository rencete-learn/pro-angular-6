import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../model/product-repository.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  selectedCategory : string = null;

  constructor(private repository : ProductRepositoryService) { }

  ngOnInit() {
  }

  getProducts() {
    return this.repository.getProducts(this.selectedCategory);
  }
  
  getCategories() {
    return this.repository.getCategories();
  }

  changeCategory(cat: string) {
    this.selectedCategory = cat ? cat : null;
  }
}
