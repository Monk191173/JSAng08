import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInfoComponent } from './action-info.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { ActionsModule } from '../actions.module';
import { AngularFireModule } from '@angular/fire/compat';


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
      ],
      providers: [
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

  it('should be load one action', () => {
    const ACT_ID = '5obj1aOpNRlU16CnISHT';
    spyOn(component, 'getOneAction').and.callThrough();
    component.getOneAction();
    expect(component.getOneAction()).toHaveBeenCalled()
  })


});


