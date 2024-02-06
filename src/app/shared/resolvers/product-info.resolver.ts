import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products/products.service';
import { inject } from '@angular/core';
import { DocumentData } from '@firebase/firestore';

export const productInfoResolver: ResolveFn<DocumentData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> => {
    return inject(ProductsService).getAllFirebase()
};
