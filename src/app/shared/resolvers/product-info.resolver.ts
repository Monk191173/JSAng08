import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IProductResponse } from '../interfaces/products';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products/products.service';
import { inject } from '@angular/core';

export const productInfoResolver: ResolveFn<IProductResponse[]>=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<IProductResponse[]> =>{
 return  inject(ProductsService).getAll()
};
