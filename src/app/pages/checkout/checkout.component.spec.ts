import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let product:IProductResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports:[HttpClientModule],
      providers:[
        {provide:Firestore, useValue:{}},
        {provide:MatDialogRef, useValue:{
          close:()=>{}
        }}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('total basket',()=>{
    const F_BASKET=[{
      id:'2',
      name:'string',
      category:'string',
      subcategory:'string',
      description:'string',
      weight:'string',
      price:15,
      filePath:'string',
      count: 2
    }]
    component.basket=F_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(30);
  });

it('clear basket',()=>{
  spyOn(component, 'clearBasket').and.callThrough();
  component.clearBasket();
  expect(component.clearBasket).toHaveBeenCalled();
});

it('delete product from basket should be call',()=>{
  const product={
    id:'2',
    name:'string',
    category:'string',
    subcategory:'string',
    description:'string',
    weight:'string',
    price:15,
    filePath:'string',
    count: 2
  }
  fixture.detectChanges();
  const del=spyOn(component, 'deleteProduct').and.callThrough();
  component.deleteProduct(product);
  expect(del).toHaveBeenCalled();
});


it('should call basketClick() with spy MatDialofRef.close', () => {
  const rrs=spyOn(component,'basketClick').and.callThrough();
  component.basketClick();
  expect(rrs).toHaveBeenCalledTimes(1);
});

});
