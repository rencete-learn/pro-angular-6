import { Component, OnInit } from '@angular/core';

import { CartService } from "../model/cart.service";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(public cart: CartService) { }

  ngOnInit() {
  }

}
