import { Injectable } from '@angular/core';

import { Order } from "./order.model";
import { StaticDatasourceService } from './static-datasource.service';
import { Observable } from 'rxjs';

@Injectable()
export class OrderRepositoryService {
  private orders: Order[] = [];

  constructor(private ds: StaticDatasourceService) { }

  getOrders(): Order[] {
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.ds.saveOrder(order);
  }
}
