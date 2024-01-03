import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { NapoyiComponent } from './napoyi.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';

const routes: Routes = [
    {path:'',component:NapoyiComponent,
    resolve:{product:productInfoResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NapoyiRoutingModule { }