import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-roli',
  templateUrl: './roli.component.html',
  styleUrls: ['./roli.component.scss']
})
export class RoliComponent {

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.setSubCat('All');
  }


  setSubCat(subCat: string): void {
    this.prodService.CategoryName = 'Роли';
    this.prodService.subCategoryName = subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
