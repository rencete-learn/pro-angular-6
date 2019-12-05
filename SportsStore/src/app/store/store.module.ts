import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { ModelModule } from "../model/model.module";
import { CounterDirective } from './counter.directive';
import { CartSummaryComponent } from './cart-summary.component';
import { CartDetailsComponent } from './cart-details.component';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ModelModule
  ],
  declarations: [StoreComponent, CounterDirective, CartSummaryComponent, CartDetailsComponent, CheckoutComponent],
  exports: [StoreComponent]
})
export class StoreModule { }
