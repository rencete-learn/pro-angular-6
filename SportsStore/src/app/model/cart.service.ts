import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class CartService {
  public cartItems: CartLineItem[];
  public numProducts: number = 0;
  public totalAmount: number = 0;

  constructor() {
    this.clearCart();
  }

  addLineItem(product: Product, qty: number) {
    const lineItem = this.cartItems.find(p => p.product.id === product.id);
    if (typeof lineItem !== "undefined") {
      lineItem.qty += qty;
    } else {
      this.cartItems.push(new CartLineItem(product, qty));
    }
    this.recalculate();
  }

  removeItem(id: number) {
    const index = this.cartItems.findIndex(p => p.product.id === id);
    if (index >= 0) {
      this.cartItems.splice(index, 1); // remove cart line item
    }
    this.recalculate();
  }

  updateQty(product: Product, qty: number) {
    const lineItem = this.cartItems.find(p => p.product.id === product.id);
    if (typeof lineItem !== "undefined") {
      lineItem.qty = qty;
      this.recalculate();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.recalculate();
  }

  private recalculate() {
    this.numProducts = this.cartItems.length;
    this.totalAmount = 0; // reset total amount first
    this.cartItems.forEach(li => this.totalAmount += li.lineTotal());
  }
}

export class CartLineItem {
  constructor(public product: Product, public qty: number) { }

  lineTotal(): number {
    return this.product.price * this.qty;
  }
}