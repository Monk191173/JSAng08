import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionReference } from '@firebase/firestore';
import { SetuComponent } from './setu.component';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SetuComponent', () => {
  let component: SetuComponent;
  let fixture: ComponentFixture<SetuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetuComponent],
      imports:[CollectionReference],
      providers:[
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(SetuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
