import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingModule } from './actions-routing.module';
import { ActionInfoComponent } from './action-info/action-info.component';



@NgModule({
  declarations: [
    ActionsComponent,
    ActionInfoComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }
