import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CabinetComponent } from './cabinet.component';
import { PersonalComponent } from './personal/personal.component';
import { HistoryComponent } from './history/history.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  {
    path: '', component: CabinetComponent,
    children: [
      { path: 'personal', component: PersonalComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'password', component: PasswordComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }