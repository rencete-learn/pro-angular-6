import { Component, OnInit } from '@angular/core';
import { OrderRepositoryService } from 'src/app/model/order-repository.service';
import { Order } from 'src/app/model/order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  public includeShipped: boolean = false;
  public ds$: Observable<OrderDataSource[]>;

  constructor(private repository: OrderRepositoryService) { }

  ngOnInit() {
    this.ds$ = this.repository.getOrders$().pipe(
      map(this.convertToDatasource)
    );
  }

  getOrders(): Order[] {
    return this.repository.getOrders().filter(order => this.includeShipped || !order.shipped );
  }

  markedShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  deleteOrder(id: number) {
    this.repository.deleteOrder(id);
  }

  convertToDatasource(orders: Order[], index: number): OrderDataSource[] {
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