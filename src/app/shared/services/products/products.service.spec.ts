import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { IProductResponse } from '../../interfaces/products';
import { Observable } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let products:Observable<IProductResponse[]>;

  beforeEach(() => {
    

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        
      ],
      providers: [
        { provide: Firestore, useValue: {} },
      ]
    });
    service = TestBed.inject(ProductsService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('product service getData with ID=1', (done) => {
    service.getOne(1).subscribe((resp) => {
      expect(resp.name).toEqual("Каліфорнія з крабом – 50%");
      done()
    })
  });




});
