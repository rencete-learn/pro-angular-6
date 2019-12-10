import { Injectable } from '@angular/core';

import { Order } from "./order.model";
import { RestDatasourceService } from './rest-datasource.service';
import { Observable } from 'rxjs';

@Injectable()
export class OrderRepositoryService {
  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(private ds: RestDatasourceService) { }

  loadOrders() {
    this.loaded = true;
    this.ds.getOrders().subscribe(orders => this.orders = orders);
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.ds.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.ds.updateOrder(order)
      .subscribe(o => this.orders.splice(this.orders.findIndex(x => x.id == o.id), 1, o));  
  }

  deleteOrder(id: number) {
    this.ds.deleteOrder(id)
      .subscribe(o => this.orders.splice(this.orders.findIndex(x => x.id == o.id), 1));
  }
}
