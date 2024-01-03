import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product.component';
import { InfoProductComponent } from '../info-product/info-product.component';
import { ShowRoutingModule } from './show-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SousiComponent } from '../sousi/sousi.component';
import { SetuComponent } from '../setu/setu.component';
import { NapoyiComponent } from '../napoyi/napoyi.component';
import { RoliComponent } from '../roli/roli.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { SharedModule } from 'src/app/shared/shared-module';



@NgModule({
  declarations: [
    ShowProductComponent,
    // HomeComponent,
    // SousiComponent,
    // SetuComponent,
    // NapoyiComponent,
    // RoliComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ShowRoutingModule
  ],
  exports:[ShowProductComponent]
})
export class ShowProductModule { }
