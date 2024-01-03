import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-roli',
  templateUrl: './roli.component.html',
  styleUrls: ['./roli.component.scss']
})
export class RoliComponent {
  // public product:Array<IProductResponse>=[];
  // public subCategoryName='All';
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
    this.prodService.CategoryName='Роли';
    this.prodService.subCategoryName=subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
