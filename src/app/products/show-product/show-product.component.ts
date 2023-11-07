import { Component } from '@angular/core';
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
  public product: IProductResponse[] = [];
  public subCategoryName = 'All';
  public CategoryName = 'Роли';
  private myRes = new Subscription();
  private mySub = new Subscription();


  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.myRes = this.route.data.subscribe(({ product }) => {
      this.product = product;
      this.subCategoryName = this.prodService.subCategoryName;
      this.CategoryName = this.prodService.CategoryName;


    })

    this.mySub = this.prodService.changeProductGroup.subscribe(() => {
      this.loadProducts();
      this.subCategoryName = this.prodService.subCategoryName;
      this.CategoryName = this.prodService.CategoryName;

    })
  }

  loadProducts() {
    this.prodService.getAll().subscribe(data => {
      this.product = data;
    })
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
