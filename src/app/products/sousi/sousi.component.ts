import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-sousi',
  templateUrl: './sousi.component.html',
  styleUrls: ['./sousi.component.scss']
})
export class SousiComponent {
  // public product:Array<IProductResponse>=[];
  constructor(private prodService:ProductsService){}
  
  ngOnInit():void{
    this.setSubCat('All');
    // this.loadProducts()
  }
  
  // loadProducts(){
  //   this.prodService.getAll().subscribe(data=>{
  //     this.product=data
  //   })
  // }

  setSubCat(subCat:string):void{
    this.prodService.CategoryName='Соуси';
    this.prodService.subCategoryName=subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
