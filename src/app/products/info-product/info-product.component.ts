import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent {
  // public count=1;
  public filePath = '';
  public name = '';
  public description = '';
  public weight = '';
  public price: number = 0;
  public routes = [{ link: '/home', name: 'Головна' }];
  public product!: IProductResponse;
  private myRes = new Subscription();
  constructor(
    private prodServ: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    let path: string;
    let PRODUCT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.activatedRoute.snapshot.paramMap.get('id')!=null){
    
    this.prodServ.getOne(PRODUCT_ID).subscribe(data => {
        this.product = data;
        this.product.count = 1;
        this.filePath = this.product.filePath;
        this.name = this.product.name;
        this.description = this.product.description;
        this.weight = this.product.weight;
        this.price = this.product.price;
        switch (this.product.category) {
          case 'Роли': { path = '/products/roli'; break }
          case 'Сети': { path = '/products/setu'; break }
          case 'Напої': { path = '/products/napoyi'; break }
          case 'Соуси': { path = '/products/sousi'; break }

        }
        this.routes.push({ link: path, name: this.product.category.toString() })
    });
  }

    this.myRes = this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;
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
    this.prodServ.changeBasket.next(true);
  }
}
