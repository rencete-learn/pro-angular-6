import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Product } from "./product.model";
import { Order } from "./order.model";

const PROTOCOL: string = 'http';
const PORT: number = 3500; 

@Injectable()
export class RestDatasourceService {
  private baseURL: string;
  public authToken: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + "products");
  }

  saveOrder(order: Order) : Observable<Order> {
    return this.http.post<Order>(this.baseURL + "orders", order);
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.baseURL + "login", {
      name: username,
      password: password
    }).pipe(map(resp => {
      this.authToken = resp.success ? resp.token : null;
      return resp.success;
    }));
  }
}
