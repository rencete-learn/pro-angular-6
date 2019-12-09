import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  { path: "main", component: AdminComponent },
  { path: "**", redirectTo: "auth", canActivate: [AuthGuardService] }
]);

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [AuthGuardService],
  declarations: [AuthComponent, AdminComponent]
})
export class AdminModule { }
