import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapoyiComponent } from './napoyi.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NapoyiComponent', () => {
  let component: NapoyiComponent;
  let fixture: ComponentFixture<NapoyiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NapoyiComponent],
      imports:[HttpClientModule],
      providers:[
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(NapoyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
