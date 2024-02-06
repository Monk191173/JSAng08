import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public prodService: ProductsService
  ) { }



  ngOnInit(): void {
    this.setSubCat('All');
  }


  setSubCat(subCat: string): void {
    this.prodService.CategoryName = 'Роли';
    this.prodService.subCategoryName = subCat;
    this.prodService.changeProductGroup.next(true);
  }

}
