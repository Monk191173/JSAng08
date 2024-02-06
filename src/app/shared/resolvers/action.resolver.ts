import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ActionService } from '../services/actions/action.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { DocumentData } from '@firebase/firestore';


export const actionResolver: ResolveFn<DocumentData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> => {

  return inject(ActionService).getAllFirebase()

};
