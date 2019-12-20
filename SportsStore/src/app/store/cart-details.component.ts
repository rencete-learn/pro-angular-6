import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { CartService, CartLineItem } from '../model/cart.service';
import { ConnectionService } from '../model/connection.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  public connected: boolean = true;
  private subs: Subscription;

  // Displayed columns refer to the matColumnDef values
  displayedColumns: string[] = ['Qty', 'Product', 'Price', 'Subtotal', 'RemoveButton']

  constructor(private cart: CartService, private connection: ConnectionService) { }

  ngOnInit() {
    this.connected = this.connection.connected;
    this.subs = this.connection.Changes.subscribe(value => this.connected = value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get lineItems(): number {
    return this.cart.cartItems.length;
  }

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
