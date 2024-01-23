import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvironmentInjector, EnvironmentProviders } from '@angular/core';
import { environment } from 'src/environments/environment';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;
  let fs:Firestore;
  let env:EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminActionsComponent],
      imports:[
        HttpClientModule,
        ReactiveFormsModule,
        provideFirestore(() => getFirestore()),
      ],
      providers:[
        {provide:Firestore, useValue:{fs}},
        {provide:Storage, useValue:{}},
        {provide:environment,useValue:{env}}
      ]
    });
    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fs=new Firestore(fs);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
