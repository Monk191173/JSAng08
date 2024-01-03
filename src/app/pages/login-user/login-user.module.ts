import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserRoutingModule } from './login-user-routing.module';
import { LoginUserComponent } from './login-user.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module';


@NgModule({
  declarations: [LoginUserComponent],
  imports: [
    CommonModule,
    LoginUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginUserModule { }
