import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { DocumentData } from '@firebase/firestore';

export const usersResolver: ResolveFn<DocumentData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> => {

  return inject(UsersService).getAllFirestore()
};
