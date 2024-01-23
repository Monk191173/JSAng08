import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ROUTES, Routes } from '@angular/router';

describe('AppComponent', () => {
// let route:Routes;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers:[
      // {provide:AppRoutingModule,useValue:{routeModule}},
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
      AppComponent
    ]
  }));

  
  


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'monosushi'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('monosushi');
  });

});
