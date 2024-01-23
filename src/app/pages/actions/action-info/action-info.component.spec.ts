import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ActionInfoComponent } from './action-info.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentData, DocumentSnapshot, Firestore, FirestoreModule, doc, getDoc, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { ActionsModule } from '../actions.module';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';


describe('ActionInfoComponent', () => {
  let component: ActionInfoComponent;
  let fixture: ComponentFixture<ActionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionInfoComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ActionsModule,
        AngularFireModule,
        AppModule
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideStorage(() => getStorage()),
        // provideFirestore(() => getFirestore()),
        // provideAuth(() => getAuth()),
      ],
      providers: [
        // {provide:Firestore, useValue:{}},
        // {provide:FirebaseApp, useValue:{}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be load one action', (done) => {
    const ACT_ID = '5obj1aOpNRlU16CnISHT';
    spyOn(component, 'loadAction').and.callThrough();
    component.loadAction(ACT_ID).then((data)=>{
      expect(data.get('name')).toBe('Фотомарафон')
      done()
    })
  })


});


