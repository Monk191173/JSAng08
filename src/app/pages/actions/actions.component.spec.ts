import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { ActionService } from 'src/app/shared/services/actions/action.service';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      imports:[
        HttpClientModule
      ],
      providers:[
        {provide:Firestore, useValue:{}},
      ]
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be action ID=25', () => {
    const ACT_ID = 25;
    
    spyOn(component, 'seeMoreAction').and.callThrough();
    component.seeMoreAction(ACT_ID);
    expect(component.actionService.curActionId).toBe(25);
  })

});
