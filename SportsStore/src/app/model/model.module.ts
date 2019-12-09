import { NgModule } from '@angular/core';
import { StaticDatasourceService } from './static-datasource.service';
import { ProductRepositoryService } from './product-repository.service';
import { CartService } from './cart.service';
import { Order } from './order.model';
import { OrderRepositoryService } from './order-repository.service';

@NgModule({
  providers: [
    StaticDatasourceService,
    ProductRepositoryService,
    CartService,
    Order,
    OrderRepositoryService
  ]
})
export class ModelModule { }
