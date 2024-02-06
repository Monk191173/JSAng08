import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProductRequest } from '../../interfaces/products';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { CollectionReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public curActionId: number = -1;
  public changeProductGroup = new Subject<boolean>();
  public changeBasket = new Subject<boolean>();
  public CategoryName = '';
  public subCategoryName = '';
  private productColection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) {
    this.productColection = collection(afs, 'products');
  }

  //---------------------------------------------------------------------------------------
  getAllFirebase() {
    return collectionData(this.productColection, { idField: 'id' })
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const refProductsDoc = doc(this.afs, `products/${id}`);
    return docData(refProductsDoc, { idField: 'id' }) as Observable<DocumentData>
  }

  createFirebase(product: IProductRequest): Promise<DocumentReference<DocumentData>> {
    product.count = 1;
    return addDoc(this.productColection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const refProductsDoc = doc(this.afs, `products/${id}`);
    return setDoc(refProductsDoc, product)
  }

  deleteFirebase(id: string) {
    const refProductsDoc = doc(this.afs, `products/${id}`);
    return deleteDoc(refProductsDoc);
  }

}

