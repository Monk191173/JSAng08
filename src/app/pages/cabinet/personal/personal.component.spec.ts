import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { usersResolver } from 'src/app/shared/resolvers/users.resolver';
import { CabinetModule } from '../cabinet.module';
import { Storage } from '@angular/fire/storage';
import { AppModule } from 'src/app/app.module';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;
  let toas:ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // CabinetModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: ToastrService, useValue: {toas,error:()=>true} },
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: UsersService, useValue: {} }, 
        // {provide:usersResolver,useValue:{}},
        { provide: FormBuilder, useClass: FormBuilder }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();

  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should be User.firstName="A" because getUser() make User.firstName=""', () => {
    const FAKE_User = {
      uid: '',
      email: '',
      role: '',
      firstName: 'A',
      lastName: 'B',
      phone: ''
    }
    
    component.getUser();
    component.User = FAKE_User;
    expect(component.User.firstName).toBe('A');
  });

  it('should be call updateUser() and User.firstName=""', () => {
    component.updateUser();
    expect(component.User.firstName).toBe('');
  });

});
