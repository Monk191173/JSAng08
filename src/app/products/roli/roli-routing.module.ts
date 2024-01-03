import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RoliComponent } from './roli.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';

const routes: Routes = [
    {path:'',component:RoliComponent, 
    resolve:{product:productInfoResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoliRoutingModule { }