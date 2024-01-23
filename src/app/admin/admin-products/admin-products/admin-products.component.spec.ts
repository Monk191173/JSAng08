import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent],
      imports:[
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Firestore, useValue:{}},
        {provide:Storage,useValue:{}}
      ]
    });
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
