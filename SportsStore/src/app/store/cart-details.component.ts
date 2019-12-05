import { Component } from '@angular/core';
import { CartService, CartLineItem } from '../model/cart.service';
import { Observable, of } from 'rxjs';

import { Product } from "../model/product.model";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  // Displayed columns refer to the matColumnDef values
  displayedColumns: string[] = ['Qty', 'Product', 'Price', 'Subtotal', 'RemoveButton']

  constructor(private cart: CartService) { }

  get totalAmount(): number {
    return this.cart.totalAmount;
  }

  getTableDataSource(): Observable<CartLineItem[]> {
    return of(this.cart.cartItems);
  }

  removeItem(p: Product) {
    this.cart.removeItem(p.id);
  }

  updateQty(event: Event, product: Product) {
    let newQty = Number((<HTMLInputElement>event.target).value);
    if (!newQty) {
      newQty = 0;
    }
    this.cart.updateQty(product, newQty);
  }
}
