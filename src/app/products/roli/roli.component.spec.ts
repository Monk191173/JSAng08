import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoliComponent } from './roli.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RoliComponent', () => {
  let component: RoliComponent;
  let fixture: ComponentFixture<RoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoliComponent],
      imports:[
        HttpClientModule
      ],
      providers:[
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(RoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
