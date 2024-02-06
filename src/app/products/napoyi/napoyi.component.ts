import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-napoyi',
  templateUrl: './napoyi.component.html',
  styleUrls: ['./napoyi.component.scss']
})
export class NapoyiComponent {
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.setSubCat('All');
  }


  setSubCat(subCat: string): void {
    this.prodService.CategoryName = 'Напої';
    this.prodService.subCategoryName = subCat;
    this.prodService.changeProductGroup.next(true);
  }
}
