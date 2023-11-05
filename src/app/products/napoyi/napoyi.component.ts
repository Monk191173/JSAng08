import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-napoyi',
  templateUrl: './napoyi.component.html',
  styleUrls: ['./napoyi.component.scss']
})
export class NapoyiComponent {
  public product:Array<IProductResponse>=[];
  constructor(private prodService:ProductsService){}
  
  ngOnInit():void{
    this.loadProducts()
  }
  
  loadProducts(){
    this.prodService.getAll().subscribe(data=>{
      this.product=data
    })
  }
}
