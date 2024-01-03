import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoliRoutingModule } from './roli-routing.module';
import { RoliComponent } from './roli.component';
import { ShowProductModule } from '../show-product/show-product.module';


@NgModule({
  declarations: [RoliComponent],
  imports: [
    CommonModule,
    RoliRoutingModule,
    ShowProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RoliModule { }