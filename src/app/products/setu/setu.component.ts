import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-setu',
  templateUrl: './setu.component.html',
  styleUrls: ['./setu.component.scss']
})
export class SetuComponent {
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
    this.prodService.CategoryName='Сети';
    this.prodService.subCategoryName=subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
