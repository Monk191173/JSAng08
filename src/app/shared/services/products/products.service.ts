import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProductRequest,IProductResponse } from '../../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  public curActionId:number=-1;
  public changeProductGroup=new Subject<boolean>();
  public changeBasket=new Subject<boolean>();
  public CategoryName='';
  public subCategoryName='';

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  create(action: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, action);
  }

  update(category: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }
}

