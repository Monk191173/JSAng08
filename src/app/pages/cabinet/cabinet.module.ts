import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet.component';
import { PersonalComponent } from './personal/personal.component';
import { HistoryComponent } from './history/history.component';
import { PasswordComponent } from './password/password.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CabinetComponent, 
    PersonalComponent,
    HistoryComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CabinetModule { }
