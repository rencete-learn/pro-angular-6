import { NgModule } from '@angular/core';
import { StaticDatasourceService } from './static-datasource.service';
import { ProductRepositoryService } from './product-repository.service';
import { CartService } from './cart.service';

@NgModule({
  providers: [StaticDatasourceService, ProductRepositoryService, CartService]
})
export class ModelModule { }
