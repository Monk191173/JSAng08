import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productInfoResolver } from './product-info.resolver';
import { IProductResponse } from '../interfaces/products';

describe('roductInfoResolver', () => {
  const executeResolver: ResolveFn<IProductResponse[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productInfoResolver(...resolverParameters) as IProductResponse[]);

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
