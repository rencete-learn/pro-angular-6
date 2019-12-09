import { NgModule } from '@angular/core';
import { StaticDatasourceService } from './static-datasource.service';
import { ProductRepositoryService } from './product-repository.service';
import { CartService } from './cart.service';
import { Order } from './order.model';
import { OrderRepositoryService } from './order-repository.service';
import { RestDatasourceService } from './rest-datasource.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ProductRepositoryService,
    CartService,
    Order,
    OrderRepositoryService,
    RestDatasourceService,    
    { provide: StaticDatasourceService, useExisting: RestDatasourceService }
  ]
})
export class ModelModule { }
