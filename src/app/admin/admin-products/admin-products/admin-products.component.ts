import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { IProductResponse } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/products/products.service';

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
  private currentProductId = '';


  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
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
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[]
    })
  }


  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateFirebase(this.productForm.value, this.currentProductId).then(() => {
        this.loadProducts();
      })
    } else {
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadProducts();
      })
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
    this.currentProductId = product.id;
    this.isUploaded = true;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.deleteFirebase(product.id).then(() => {
      this.loadProducts();
    })
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('filePath'));
    if (!task) this.isUploaded = false;
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
