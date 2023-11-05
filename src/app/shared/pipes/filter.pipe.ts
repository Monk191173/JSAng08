import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from '../interfaces/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(prod:IProductResponse[], cat:string, subCat?:string): IProductResponse[] {
    if (!prod||!cat) return [];
    if (!subCat||subCat=='All') return prod.filter(pro=>pro.category==cat);
    return prod.filter(sub=>(sub.category==cat&&sub.subcategory==subCat));
  }

}
