import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-sousi',
  templateUrl: './sousi.component.html',
  styleUrls: ['./sousi.component.scss']
})
export class SousiComponent {
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.setSubCat('All');
  }

  setSubCat(subCat: string): void {
    this.prodService.CategoryName = 'Соуси';
    this.prodService.subCategoryName = subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
