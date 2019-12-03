import { NgModule } from '@angular/core';
import { StaticDatasourceService } from './static-datasource.service';
import { ProductRepositoryService } from './product-repository.service';

@NgModule({
  providers: [StaticDatasourceService, ProductRepositoryService]
})
export class ModelModule { }
