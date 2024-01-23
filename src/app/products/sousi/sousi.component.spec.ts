import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousiComponent } from './sousi.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SousiComponent', () => {
  let component: SousiComponent;
  let fixture: ComponentFixture<SousiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousiComponent],
      imports:[HttpClientModule],
      providers:[
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(SousiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
