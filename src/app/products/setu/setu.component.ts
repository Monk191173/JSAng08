import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-setu',
  templateUrl: './setu.component.html',
  styleUrls: ['./setu.component.scss']
})
export class SetuComponent {
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.setSubCat('All');
  }


  setSubCat(subCat: string): void {
    this.prodService.CategoryName = 'Сети';
    this.prodService.subCategoryName = subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
