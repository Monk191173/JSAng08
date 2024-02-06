import { TestBed } from '@angular/core/testing';
import { CollectionReference } from '@firebase/firestore';
import { ProductsService } from './products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocumentData, DocumentReference,Firestore, FirestoreModule, collection, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IProductResponse } from '../../interfaces/products';
import { Observable } from 'rxjs';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppModule } from 'src/app/app.module';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('ProductsService', () => {
  let service: ProductsService;
  // let products:Observable<IProductResponse[]>;

  beforeEach(() => {
    

    TestBed.configureTestingModule({
      imports: [
        
        
      ],
      providers: [
        { provide: Firestore, useValue: {} },

        // { provide:ProductsService,useValue:{getOneFirebase:()=>{}}}

      ]
    });
    service = TestBed.inject(ProductsService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('product service getData with ID=', (done) => {
    service.getOneFirebase('yWnHbhQtNvMGlXVVh8PY').subscribe((resp) => {
      const rez=resp as IProductResponse;
      expect(rez.name).toEqual("Каліфорнія з крабом – 50%");
      done()
    })
  });




});
