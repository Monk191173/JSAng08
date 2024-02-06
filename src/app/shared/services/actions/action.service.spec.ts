import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import { provideFirestore,getFirestore,collection } from '@angular/fire/firestore';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { Firestore } from '@angular/fire/firestore';

fdescribe('ActionService', () => {
  let service: ActionService;
  let afs: Firestore;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() =>initializeApp(environment.firebase)), 
        provideFirestore(() => getFirestore()),
      ],
      providers: [

        {provide:Firestore,useValue:{afs}},
      ]
    });
    service = TestBed.inject(ActionService);
  afs=TestBed.inject(Firestore);
  });

  it('should be created', () => {
    // service.actionsColection = collection(afs, 'actions');
    expect(service).toBeTruthy();
  });
});
