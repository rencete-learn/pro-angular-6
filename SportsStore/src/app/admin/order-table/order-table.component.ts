import { Component, OnInit } from '@angular/core';
import { OrderRepositoryService } from 'src/app/model/order-repository.service';
import { Order } from 'src/app/model/order.model';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  public includeShipped: boolean = false;
  public ds$: Observable<OrderDataSource[]>;
  public selectedId: number | null = null;
  public includeShipped$: BehaviorSubject<boolean> = new BehaviorSubject(this.includeShipped);

  constructor(private repository: OrderRepositoryService) { }

  ngOnInit() {    
    this.ds$ = combineLatest(this.repository.getOrders$(), this.includeShipped$.asObservable())    
      .pipe(
        map(([orders, includeShipped]) => {
          return orders.filter(order => includeShipped || !order.shipped);
        }),
        map(this.convertToDatasource, this)
      );
      
    this.includeShipped$.next(this.includeShipped);
  }  

  markedShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  deleteOrder(id: number) {
    this.repository.deleteOrder(id);
  }

  updateSelected(id: number) {
    if (this.selectedId == id) {
      this.selectedId = null;
    } else {
      this.selectedId = id;
    }
  }

  emitNextIncludeShipped() {
    this.includeShipped$.next(!this.includeShipped);
  }

  private convertToDatasource(orders: Order[], index: number): OrderDataSource[] {
    let ds: OrderDataSource[] = [];
    orders.forEach(
      order => {
        let orderDS: OrderDataSource = {
          id: order.id,
          name: order.name,
          zip: order.zip,
          product: "Product",
          quantity: "Quantity",
          order: order,
          type: "order"
        }
        ds.push(orderDS);
        order.cart.cartItems.forEach(
          cartItem => {
            let cartDS: OrderDataSource = {
              id: order.id,
              name: "",
              zip: "",
              product: cartItem.product.name,
              quantity: cartItem.qty.toString(),
              order: undefined,
              type: "cart"
            }
            ds.push(cartDS);
          }
        )        
      }
    )
    return ds;
  }
}

interface OrderDataSource {
  id: number;
  name: string;
  zip: string;
  product: string;
  quantity: string;
  order: Order;
  type: "order" | "cart";
}