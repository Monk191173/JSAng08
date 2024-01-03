import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SousiComponent } from './sousi.component';
import { ShowProductModule } from '../show-product/show-product.module';
import { ShowProductComponent } from '../show-product/show-product.component';
import { SousiRoutingModule } from './sousi-routing.module';


@NgModule({
  declarations: [SousiComponent],
  imports: [
    CommonModule,
    SousiRoutingModule,
    ShowProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SousiModule { }
