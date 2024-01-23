import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductComponent } from './info-product.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoModule } from './info-product.module';
import { productInfoResolver } from 'src/app/shared/resolvers/product-info.resolver';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { Observable } from 'rxjs';

describe('InfoProductComponent', () => {
  let component: InfoProductComponent;
  let fixture: ComponentFixture<InfoProductComponent>;
  let FAKE_prod:IProductResponse;
  // let myServ:ProductsService;

  beforeEach(() => {
    FAKE_prod={
      id:'1',
      name:'string',
      category:'string',
      subcategory:'string',
      description:'string',
      weight:'string',
      price:10,
      filePath:'string',
      count: 2
    }
    TestBed.configureTestingModule({
      
      declarations: [InfoProductComponent],
      imports:[
        HttpClientModule,
        RouterTestingModule
        
      ],
      providers:[
        {provide:Firestore, useValue:{}},

      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    
    fixture = TestBed.createComponent(InfoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.product=FAKE_prod;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('add to basket one product',()=>{
    const bas=spyOn(component,'addToBasket').and.callThrough();
    component.addToBasket(FAKE_prod);
    expect(bas).toHaveBeenCalled();
});

it('inc count of product in info-product',()=>{
  spyOn(component,'productCount').and.callThrough();
  component.productCount(FAKE_prod,true);
  expect(component.product.count).toBe(3);
});

it('dec count of product in info-product',()=>{
  spyOn(component,'productCount').and.callThrough();
  component.productCount(FAKE_prod,false);
  expect(component.product.count).toBe(1);
});

it('add to basket one product when basket is not empty',()=>{
  const bas=spyOn(component,'addToBasket').and.callThrough();
  component.addToBasket(FAKE_prod);
  expect(bas).toHaveBeenCalled();
});

});
