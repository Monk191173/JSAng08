import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IUserResponse } from '../interfaces/users';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UsersService } from '../services/users/users.service';

export const usersResolver: ResolveFn<IUserResponse[]>=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<IUserResponse[]> =>{
  
  return inject(UsersService).getAll()
};
