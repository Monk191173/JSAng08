import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserComponent } from './login-user.component';
import { HttpClientModule } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUserComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ToastrService, useValue: {
            error: () => 'error',
            success: () => 'success'
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goReg()', () => {
    const gores = spyOn(component, 'goReg').and.callThrough();
    component.goReg();
    expect(gores).toHaveBeenCalled();
  });

  it('call SignIN() where user is registred ', () => {
    component.regUser = true;
    const usersForm = new FormGroup({
      name: new FormControl('qwer12'),
      sename: new FormControl('QQQ2'),
      phone: new FormControl('067782'),
      email: new FormControl('qwer@ty.ty'),
      password: new FormControl(['qwer@ty.ty', Validators.required]),
      dupassword: new FormControl('qwer@ty.ty')
    });
    component.usersForm = usersForm;
    fixture.detectChanges();

    const signres = spyOn(component, 'signIn').and.callThrough();
    component.signIn();
    expect(signres).toHaveBeenCalled();
  });

  it('call SignIN() where user is NOT registred ', () => {
    component.regUser = false;
    const usersForm = new FormGroup({
      name: new FormControl('qwer12'),
      sename: new FormControl('QQQ2'),
      phone: new FormControl('067782'),
      email: new FormControl('qwer@ty.ty'),
      password: new FormControl(['qwer@ty.ty', Validators.required]),
      dupassword: new FormControl('qwer@ty.ty')
    });
    component.usersForm = usersForm;
    fixture.detectChanges();

    const signres = spyOn(component, 'signIn').and.callThrough();
    component.signIn();
    expect(signres).toHaveBeenCalled();
  });

});
