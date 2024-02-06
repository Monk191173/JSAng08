import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/header/header.component';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  public basket: Array<IProductResponse> = [];
  public total = 0;
  constructor(
    public prodService: ProductsService,
    private dialogRef: MatDialogRef<HeaderComponent>
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.getTotalPrice();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  deleteProduct(product: IProductResponse): void {
    this.basket.splice(this.basket.indexOf(product), 1);
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(this.basket))
    this.prodService.changeBasket.next(true);
    this.getTotalPrice();
  }
  basketClick(): void {
    this.dialogRef.close()
  }

  clearBasket(): void {
    localStorage.removeItem('basket');
    this.basket = [];
    this.prodService.changeBasket.next(true);
    this.getTotalPrice();
  }
}
