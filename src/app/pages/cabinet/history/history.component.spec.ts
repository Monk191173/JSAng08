import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let dref:MatDialogRef<HistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      providers:[
        {provide:MatDialogRef, useValue:{
          dref,
          close:()=>{}
          
        }},
        
      ]
    });
    fixture = TestBed.createComponent(HistoryComponent);
    dref=TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call historyClick() with spy MatDialofRef.close', () => {
    const rres=spyOn(dref,'close').and.callThrough();
    component.historyClick();
    expect(rres).toHaveBeenCalledTimes(1);
  });

});
