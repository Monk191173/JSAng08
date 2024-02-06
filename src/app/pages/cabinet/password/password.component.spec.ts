import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { HttpClientModule } from '@angular/common/http';
import { Auth, UserCredential, user } from '@angular/fire/auth';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Router } from '@angular/router';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let toas: ToastrService;
  let spy: PasswordComponent;
  let userCred: Promise<UserCredential|undefined>;


  beforeEach(() => {


    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        {
          provide: ToastrService, useValue: {
            toas,
              error: () => 'error',
              success: () => 'success'
            
          }
        },
        {
          provide: PasswordComponent, useValue: {
            spy,
            // email:'123@gmail.com',
            // password:'',
            login:()=>true,
            updUser:()=>Promise
          }
        }
      ]
    });
    spy=TestBed.inject(PasswordComponent);
    toas=TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    // component.curUser={
    // email :'123@gmail.com',
    // name: '',
    // password: '12345678',
    // role: ''
    // }
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('try change password in the user cabinet should be undefined for fake user', () => {
    component.getUsersLocal();
    component.curUser={
      email :'123@gmail.com',
      name: '',
      password: '12345678',
      role: ''
      }
      fixture.detectChanges();
      spyOn(spy, 'login').and.callThrough().and.returnValue(userCred);
      
     component.signIn();
    expect(userCred).toBeUndefined()
  })

});
