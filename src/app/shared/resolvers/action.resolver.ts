import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IActionResponse } from '../interfaces/actions';
import { ActionService } from '../services/actions/action.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';


export const actionResolver: ResolveFn<IActionResponse[]>=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<IActionResponse[]> =>{
  
  return inject(ActionService).getAll()

};
