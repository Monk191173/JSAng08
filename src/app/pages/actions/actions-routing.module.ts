import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ActionsComponent } from './actions.component';
import { ActionInfoComponent } from './action-info/action-info.component';
import { actionResolver } from 'src/app/shared/resolvers/action.resolver';


const routes: Routes = [
    {path:'',component:ActionsComponent},
    {path:'action/:id', component: ActionInfoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }