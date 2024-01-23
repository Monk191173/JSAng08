import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: ToastrService, useValue: {
            error: () => 'error',
            success: () => 'success'
          }
        },
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call signIn() with a testUser', () => {

    const testUser = {
      email: 'qwer@ty.ty',
      password: 'qwer@ty.ty'
    };

    const usersForm = new FormGroup({
      name: new FormControl([null]),
      email: new FormControl([null, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl([null, Validators.required])
    });
    component.usersForm = usersForm;
    fixture.detectChanges();

    component.usersForm.controls['email'].setValue(testUser.email);
    component.usersForm.controls['password'].setValue(testUser.password);

    fixture.detectChanges();

    const sres = spyOn(component, 'signIn').and.callThrough()
    component.signIn();
    expect(sres).toHaveBeenCalled();
  });

});
