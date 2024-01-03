import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InfoProductComponent } from './info-product.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';


const routes: Routes = [
    // {path:'',component:InfoProductComponent},
    {
        path: '', component: InfoProductComponent, resolve: {
          product: productInfoResolver
        }
      },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }