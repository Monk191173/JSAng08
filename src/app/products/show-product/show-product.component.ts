import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, NgModule } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, collection, getDocs, query } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscribable, Subscriber, Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent {
  public product!:IProductResponse[];
  public curProduct: IProductResponse[]=[] ;
  public subCategoryName = 'All';
  public CategoryName = 'Роли';
  private myRes = new Subscription();
  private mySub = new Subscription();


  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private afs: Firestore
  ) {
    // this.loadProducts();
    
  }


  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      this.product=product
    })
//       // console.log(product);
//       // this.loadProducts()
// console.log({product}.product[0]);

  
//       this.curProduct = product as IProductResponse[];
//       console.log('route',this.curProduct);
//     })
// this.prodService.getAll().then(data=>{
//   data.forEach(doc => { console.log('getall',doc)})
  
  
  // this.curProduct =data as IProductResponse[]
// })
    // this.loadProducts();
    this.subCategoryName = this.prodService.subCategoryName;
    this.CategoryName = this.prodService.CategoryName;
    // console.log('init');
    
    // console.log(this.subCategoryName,this.CategoryName);
    // console.log(this.curProduct);
    
    this.mySub = this.prodService.changeProductGroup.subscribe(() => {
      // console.log('change');
      this.subCategoryName = this.prodService.subCategoryName;
      this.CategoryName = this.prodService.CategoryName;
      this.loadProducts()
    })
  }

   loadProducts(): void {
    // this.curProduct = [];
        this.prodService.getAll().subscribe(data => {
      this.product = data;
    })
    // this.getProducts().then(data => {
    //   data.docs.forEach(doc => {        
    //     this.product.description = doc.get('description');
    //     // console.log(this.product.description);
    //     this.product.filePath = doc.get('filePath');
    //     this.product.name = doc.get('name');
    //     this.product.id = doc.id;
    //     this.product.category=doc.get('category');
    //     this.product.subcategory=doc.get('subcategory');
    //     this.product.price=doc.get('price');
    //     this.product.weight=doc.get('weight');
    //     this.curProduct.push(this.product);
    //     // this.subCategoryName = doc.get('subcategory');
    //     // this.CategoryName = doc.get('category');
    //     this.product = {
    //       category: '',
    //       description: '',
    //       filePath: '',
    //       name: '',
    //       price: 0,
    //       subcategory: '',
    //       weight: '',
    //       count: 1,
    //       id: ''
    //     }
    //   })

    // })
  }

  async getProducts(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(this.afs, "products"));
    // this.curProduct = [];
    const data = await getDocs(q);
    return data;
    

  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.prodService.changeBasket.next(true);
  }

  ngOnDestroy(): void {
    this.myRes.unsubscribe();
    this.mySub.unsubscribe()
  }

}
