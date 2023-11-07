import { Component } from '@angular/core';
import { Storage,ref,getDownloadURL } from '@angular/fire/storage';
import { IProductResponse } from '../shared/interfaces/products';
import { ProductsService } from '../shared/services/products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // public linkAct='';
  public total = 0;
  public total_count = 0;
  private basket: Array<IProductResponse> = [];
  public basketOpen:boolean=false;
  constructor(
    private storage: Storage,
    public prodService:ProductsService
    ){ 
    // const refAct=ref(this.storage,'images/actions.svg');
    
    // getDownloadURL(refAct).then(data=>this.linkAct=data);
  }
  ngOnInit():void{
    this.loadBasket();
    this.updateBasket();
  }
  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  getTotalCount():void{
    this.total_count = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.prodService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  basketClick():void{
    this.basketOpen=!this.basketOpen
  }

  clearBasket():void{
    localStorage.clear();
    this.basket=[];
    this.loadBasket();
    this.basketOpen=false
  }

}
