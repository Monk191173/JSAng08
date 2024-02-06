import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent {
  public product!: IProductResponse[];
  public subCategoryName = 'All';
  public CategoryName = 'Роли';
  private mySub = new Subscription();


  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      this.product = product
    })

    this.subCategoryName = this.prodService.subCategoryName;
    this.CategoryName = this.prodService.CategoryName;
    this.loadProducts()

    this.mySub = this.prodService.changeProductGroup.subscribe(() => {
      this.subCategoryName = this.prodService.subCategoryName;
      this.CategoryName = this.prodService.CategoryName;
      this.loadProducts()
    })
  }

  loadProducts(): void {
    this.prodService.getAllFirebase().subscribe(data => {
      this.product = data as IProductResponse[];
      this.product.forEach((val) => {
        val.count = 1
      })
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
    this.mySub.unsubscribe()
  }

}
