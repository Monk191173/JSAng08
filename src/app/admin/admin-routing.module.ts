import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {loginGuard} from "../shared/guards/login.guard";
import {AdminActionsComponent} from "./admin-actions/admin-actions.component";
import {AdminProductsComponent} from "./admin-products/admin-products/admin-products.component";

const routes: Routes = [
  {path:'',component:AdminComponent,children:[
      {path:'admin-actions',component:AdminActionsComponent},
      {path:'admin-products',component:AdminProductsComponent}]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
