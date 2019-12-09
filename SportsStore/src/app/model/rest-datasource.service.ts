import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { Product } from "./product.model";
import { Order } from "./order.model";

const PROTOCOL: string = 'http';
const PORT: number = 3500; 

@Injectable()
export class RestDatasourceService {
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + "products");
  }

  saveOrder(order: Order) : Observable<Order> {
    return this.http.post<Order>(this.baseURL + "orders", order);
  }
}
