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

  removeItem(li: CartLineItem) {
    this.cart.removeItem(li.product.id);
  }

  updateQty(event: Event, li: CartLineItem) {
    let newQty = Number((<HTMLInputElement>event.target).value);
    if (!newQty || newQty < 0) {
      newQty = 0;
    }
    if(newQty != li.qty) {
      this.cart.updateQty(li.product, newQty);
    }
  }
}
