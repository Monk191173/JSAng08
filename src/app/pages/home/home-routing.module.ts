import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home.component';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';

const routes: Routes = [
    {path:'',component:HomeComponent,
    resolve:{product:productInfoResolver}
    
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }