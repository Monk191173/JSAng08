import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DostavkaTaOplataComponent } from './dostavka-ta-oplata.component';
import { DostavkaRoutingModule } from './dostavka-routing.module';



@NgModule({
  declarations: [DostavkaTaOplataComponent],
  imports: [
    CommonModule,
    DostavkaRoutingModule
  ]
})
export class DostavkaTaOplataModule { }
