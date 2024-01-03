import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  // public linkAct:string='';
  private currentProductId = '';
  private product={
    category:'',
    description:'',
    filePath:'',
    name:'',
    price:0,
    subcategory:'',
    weight:'',
    count:1,
    id:''
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private afs: Firestore,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      subcategory: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      filePath: ['', Validators.required]
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          filePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  loadProducts(): void {
    this.adminProducts = [];
    this.getProducts().then(data => {
      data.docs.forEach(doc => {
        this.product.description = doc.get('description');
        this.product.filePath = doc.get('filePath');
        this.product.name = doc.get('name');
        this.product.id = doc.id;
        this.product.category=doc.get('category');
        this.product.subcategory=doc.get('subcategory');
        this.product.price=doc.get('price');
        this.product.weight=doc.get('weight');

        this.adminProducts.push(this.product);
        this.product = {
          category:'',
          description:'',
          filePath:'',
          name:'',
          price:0,
          subcategory:'',
          weight:'',
          count:1,
          id:''
        }
      })
    })


    // this.productService.getAll().subscribe(data => {
    //   this.adminProducts = data;
    // })
  }

  async getProducts(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(this.afs, "products"));
    const data = await getDocs(q);
    return data
  }

  addProduct(): void {
    if (this.editStatus) {
      
      setDoc(doc(this.afs, 'products', this.currentProductId), this.productForm.value).then(() => {
        this.loadProducts();
      })
      // this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
      //   this.loadProducts();
      // })
    } else {
      addDoc(collection(this.afs, "products"), this.productForm.value).then(() => {
        this.loadProducts();
      })
      // this.productService.create(this.productForm.value).subscribe(() => {
      //   this.loadProducts();
      // })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      subcategory: product.subcategory,
      name: product.name,
      description: product.description,
      weight: product.weight,
      price: product.price,
      filePath: product.filePath
    });
    this.editStatus = true;
    this.currentProductId = product.id ;
    this.isUploaded = true;
  }

  deleteProduct(product: IProductResponse): void {
    // this.productService.delete(product.id).subscribe(() => {
    //   this.loadProducts();
    // })
    deleteDoc(doc(this.afs, 'products', product.id)).then(() => {
      this.loadProducts();
    })
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('filePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({
        filePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
