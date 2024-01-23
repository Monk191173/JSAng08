import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let spyComponent:MatDialog;
  
  beforeEach(() => {
    // localStorage.clear();
    // localStorage.setItem('curUser',JSON.stringify({role:'ADMIN'}));
    
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        {provide:Firestore, useValue:{}},
        {provide:MatDialog, useValue:{open:()=>true}},
        {provide:HeaderComponent,useValue:{}}
      ]
    });


    spyComponent=TestBed.inject(MatDialog) ;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.roleRoute='login';
    fixture.detectChanges();
   
  });

  afterEach(()=>{
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginUser from header component with Spy open',()=>{
    const res=spyOn(spyComponent,'open').and.callThrough();
    component.loginUser();
    expect(res).toHaveBeenCalled()
  });

  it('should call callback() from header component with Spy open',()=>{
    const res1=spyOn(spyComponent,'open').and.callThrough();
    component.callback();
    expect(res1).toHaveBeenCalled()
  });

  it('should call basketClick from header component with Spy open',()=>{
    const res2=spyOn(spyComponent,'open').and.callThrough();
    component.basketClick();
    expect(res2).toHaveBeenCalled()
  })

});
