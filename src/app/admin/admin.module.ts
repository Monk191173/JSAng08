import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule}  from "./admin-routing.module";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminActionsComponent } from "./admin-actions/admin-actions.component";
import { AdminProductsComponent } from './admin-products/admin-products/admin-products.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminActionsComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
