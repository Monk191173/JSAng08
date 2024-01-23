import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      imports:[
        ReactiveFormsModule
      ],
      providers:[
        {provide:MatDialogRef, useValue:{}},
        {provide:MatDialogModule,useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
