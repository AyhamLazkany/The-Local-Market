import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '../1.Shared/store';
import { Product } from '../1.Shared/product';
import { AuthService } from '../2.Services/auth.service';
import { StoreService } from '../2.Services/store.service';
import { ProductService } from '../2.Services/product.service';
import { FileUploadService } from '../2.Services/file-upload.service';

interface createdProduct {
  store: string, storeId: string, img: string, category: string, title: string,
  description: string, quantity: number, sizes: string[], price: number
};

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit {

  uploadForm: FormGroup;
  myStore: Store;
  myProducts: Product[];
  createdProduct: createdProduct = {
    store: '', storeId: '', img: 'assets/img/products/product_logo.png', category: '', title: '',
    description: '', quantity: 0, sizes: [''], price: 0
  };
  createdProductImgSrc: string = 'assets/img/products/product_logo.png';
  progress: number;
  success: boolean;
  errMssg: string;
  errMssgCP: string;
  uploadErrMssg: string;

  constructor(@Inject('BaseURL') public baseURL: any,
    private AuthSrv: AuthService,
    private prodSrv: ProductService,
    private storeSrv: StoreService,
    private uploadSrv: FileUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.AuthSrv.getUser(this.AuthSrv.getUsername())
      .subscribe((user) => {
        if (user.seller == true) {
          this.storeSrv.getStoreByOwner(user._id)
            .subscribe((stores) => {this.myStore = stores[0];
              this.prodSrv.getProducts(stores[0]._id)
              .subscribe((products) => this.myProducts = products, (errMssg) => this.errMssg = <any>errMssg);
            }, (errMssg) => this.errMssg = <any>errMssg);
        }
      }, (errMssg) => this.errMssg = <any>errMssg);
    
  }

  selectCategory(category: string) {
    this.createdProduct.category = category;
  }
  AddSizeBox() { 
    this.createdProduct.sizes.push('');
  }
  DelSizeBox() { 
    this.createdProduct.sizes.pop();
  }

  selectProductImg(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar').updateValueAndValidity()
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.createdProductImgSrc = reader.result as string;
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.UploadProductImg();
      }, 1000);
    }
  }

  UploadProductImg(): void {
    this.progress = 0;
    if (this.uploadForm.value.avatar !== null) {
      this.uploadSrv.upload(this.uploadForm.value.avatar, 'products')
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.createdProduct.img = `assets/img/products/${event.body.filename}`;
              this.createdProductImgSrc = this.createdProduct.img;
              setTimeout(() => {
                this.progress = 0;
              }, 2000);
          }
        }, (errMssg) => this.uploadErrMssg = errMssg);
    }
  }

  CreatProduct() {
    this.createdProduct.store = this.myStore.name;
    this.createdProduct.storeId = this.myStore._id;
    this.createdProduct.quantity = this.createdProduct.sizes.length;
    this.prodSrv.postProducts(this.createdProduct)
      .subscribe((product) => {
        this.myProducts.push(product);
        this.success = true;
      }, (errMssg) => this.errMssgCP = errMssg);
  }

  deleteProduct(id: string) {
    this.prodSrv.deleteProduct(id)
      .subscribe(() => {
        const index = this.myProducts.findIndex((pro) => pro._id = id);
        this.myProducts.slice(index, 1);
      }, errMssg => this.errMssg = errMssg)
  }
}
