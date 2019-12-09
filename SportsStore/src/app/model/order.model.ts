import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable()
export class Order {
  public id: number;
  public name: string;
  public addr1: string;
  public addr2: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;
  public shipped: boolean = false;

  constructor(public cart: CartService) {};

  clear() {
    this.id = null;
    this.name = this.addr1 = this.addr2 = null;
    this.city = this.state = this.zip = this.country = null;
    this.shipped = false;
    this.cart.clearCart();
  }
}
