import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductComponent } from './show-product.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { ShowProductModule } from './show-product.module';
import { IProductResponse } from 'src/app/shared/interfaces/products';

describe('ShowProductComponent', () => {
  let component: ShowProductComponent;
  let fixture: ComponentFixture<ShowProductComponent>;
  let FAKE_prod: IProductResponse;

  beforeEach(() => {
    FAKE_prod = {
      id: '1',
      name: 'string',
      category: 'string',
      subcategory: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      filePath: 'string',
      count: 2
    }
    TestBed.configureTestingModule({
      declarations: [ShowProductComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ShowProductModule
      ],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: FilterPipe, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ShowProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add to basket one product', () => {
    const bas = spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(FAKE_prod);
    expect(bas).toHaveBeenCalled();
  });

  it('inc count of product in info-product', () => {
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(FAKE_prod, true);
    expect(FAKE_prod.count).toBe(3);
  });

  it('dec count of product in info-product', () => {
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(FAKE_prod, false);
    expect(FAKE_prod.count).toBe(1);
  });

  it('add to basket one product when basket not empty', () => {
    const bas = spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(FAKE_prod);
    expect(bas).toHaveBeenCalled();
  });
});
