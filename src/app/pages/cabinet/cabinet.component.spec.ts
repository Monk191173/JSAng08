import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetComponent } from './cabinet.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetComponent],
      imports:[
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        {provide:Firestore, useValue:{}},
        {provide:MatDialog, useValue:{}}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
