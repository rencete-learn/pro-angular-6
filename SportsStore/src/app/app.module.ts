import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material/angular-material.module";
import { StoreModule } from "./store/store.module";
import { StoreComponent } from './store/store.component';
import { CartDetailsComponent } from './store/cart-details.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreFirstGuardService } from './store-first-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    StoreModule,
    RouterModule.forRoot([
      // Adding canActivate providers, make sure that they are defined in a provider (see below)
      { path: "store", component: StoreComponent, canActivate: [StoreFirstGuardService] },
      { path: "cart", component: CartDetailsComponent, canActivate: [StoreFirstGuardService] },
      { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuardService] },
      { path: "admin", loadChildren: "./admin/admin.module#AdminModule", canActivate: [StoreFirstGuardService] },
      { path: "**", redirectTo: "/store" }
    ])
  ],
  providers: [
    StoreFirstGuardService // Allows URL guard to be injected. Note: there is no error msg but with error, if this is not added
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
