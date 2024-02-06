import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SetuComponent } from './setu.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';

const routes: Routes = [
  {
    path: '', component: SetuComponent,
    resolve: { product: productInfoResolver }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetuRoutingModule { }