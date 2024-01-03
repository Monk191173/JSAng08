import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SousiComponent } from './sousi.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';

const routes: Routes = [
    {path:'',component:SousiComponent,
    resolve:{product:productInfoResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousiRoutingModule { }