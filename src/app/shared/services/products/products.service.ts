import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProductRequest,IProductResponse } from '../../interfaces/products';
import { DocumentData, Firestore, QuerySnapshot, collection, getDocs, query } from '@angular/fire/firestore';

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

  constructor(
    private http: HttpClient,
    private afs: Firestore
    ) { }

    getAll(): Observable<IProductResponse[]> {
      return this.http.get<IProductResponse[]>(this.api.products);
    }

  getAllFire():Promise<IProductResponse[]> {
    // return this.http.get<IProductResponse[]>(this.api.products);
    return this.loadProducts()
  }
  async loadProducts(): Promise<IProductResponse[]> {
    let product={
      category:'',
      description:'',
      filePath:'',
      name:'',
      price:0,
      subcategory:'',
      weight:'',
      count:1,
      id:''
    };
    let curProduct: IProductResponse[]=[] ;
    this.getProducts().then(data => {
      data.docs.forEach(doc => {        
        product.description = doc.get('description');
        product.filePath = doc.get('filePath');
        product.name = doc.get('name');
        product.id = doc.id;
        product.category=doc.get('category');
        product.subcategory=doc.get('subcategory');
        product.price=doc.get('price');
        product.weight=doc.get('weight');
        curProduct.push(product);
        product = {
          category: '',
          description: '',
          filePath: '',
          name: '',
          price: 0,
          subcategory: '',
          weight: '',
          count: 1,
          id: ''
        }
      })

    });
    
    
    return curProduct
  }
  async getProducts(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(this.afs, "products"));
    // this.curProduct = [];
    const data = await getDocs(q);
    return data; 
  }



  create(product: IProductRequest): Observable<IProductResponse> {
    product.count=1;
    return this.http.post<IProductResponse>(this.api.products, product);
  }

  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }
}

