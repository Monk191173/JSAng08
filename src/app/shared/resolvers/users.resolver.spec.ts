import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usersResolver } from './users.resolver';
import { IUserResponse } from '../interfaces/users';

describe('usersResolver', () => {
  const executeResolver: ResolveFn<IUserResponse[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usersResolver(...resolverParameters) as IUserResponse[]);

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
