import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AppModule } from 'src/app/app.module';
import { AppComponent } from 'src/app/app.component';
import { ShowProductComponent } from 'src/app/products/show-product/show-product.component';
import { ShowProductModule } from 'src/app/products/show-product/show-product.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShowProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
