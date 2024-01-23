import { AfterContentChecked, AfterContentInit, Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
// public product:Array<IProductResponse>=[];
// public subCategoryName=this.prodService.subCategoryName;
constructor(
  public prodService:ProductsService
  ){}



ngOnInit():void{
  // this.loadProducts()
  this.setSubCat('All');
  
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
