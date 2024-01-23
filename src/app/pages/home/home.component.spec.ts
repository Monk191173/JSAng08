import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports:[HttpClientModule],
      providers:[
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set subcat TEST',()=>{
    const SUB='TEST';
    spyOn(component, 'setSubCat').and.callThrough();
    component.setSubCat(SUB);
    expect(component.setSubCat).toHaveBeenCalled();
    expect(component.prodService.subCategoryName).toBe('TEST');
  })
});
