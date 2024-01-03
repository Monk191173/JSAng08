import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NapoyiRoutingModule } from './napoyi-routing.module';
import { NapoyiComponent } from './napoyi.component';
import { ShowProductModule } from '../show-product/show-product.module';


@NgModule({
  declarations: [NapoyiComponent],
  imports: [
    CommonModule,
    NapoyiRoutingModule,
    ShowProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NapoyiModule { }