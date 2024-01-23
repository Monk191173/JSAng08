import { TestBed } from '@angular/core/testing';
import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot  } from '@angular/router';

import { actionResolver } from './action.resolver';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionService } from '../services/actions/action.service';
import { IActionResponse } from '../interfaces/actions';

describe('actionResolver', () => {
  const executeResolver: ResolveFn<IActionResponse[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => actionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        // HttpClientModule,
        // Inject,
        // Observable,
        // ActionService
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
