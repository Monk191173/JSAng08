import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product.component';
import { ShowRoutingModule } from './show-routing.module';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';



@NgModule({
  declarations: [
    ShowProductComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ShowRoutingModule
  ],
  exports: [ShowProductComponent]
})
export class ShowProductModule { }
