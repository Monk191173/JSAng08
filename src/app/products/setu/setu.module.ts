import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetuRoutingModule } from './setu-routing.module';
import { SetuComponent } from './setu.component';
import { ShowProductModule } from '../show-product/show-product.module';


@NgModule({
  declarations: [SetuComponent],
  imports: [
    CommonModule,
    SetuRoutingModule,
    ShowProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SetuModule { }