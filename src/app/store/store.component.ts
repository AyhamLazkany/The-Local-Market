import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '../1.Shared/store';
import { StoreService } from '../2.Services/store.service';
import { Product } from '../1.Shared/product';
import { ProductService } from '../2.Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store!: Store;
  products!: Product[];
  storeId!: string;
  storeErrMess!: string;
  productErrMess!: string;
  favorite: boolean = true;

  constructor(private storeSrv: StoreService,
    private productSrv: ProductService,
    private route: ActivatedRoute,
    @Inject('BaseURL') public baseURL: any) { }

  ngOnInit() {
    this.route.params.subscribe((param) => { this.storeId = param['id'] });
    this.storeSrv.getStore(this.storeId)
      .subscribe((store) => {this.store = store; this.store.createdAt = this.store.createdAt.slice(0,10)}, (errMess) => this.storeErrMess = errMess);
    this.productSrv.getProducts(this.storeId)
      .subscribe((products) => this.products = products, (errMess) => this.productErrMess = errMess);
  }
  
  categoryFound(category: string): boolean {
    if (this.products.find((prod) => prod.category === category) == undefined) 
      return false;
    else 
      return true;
  }

  productsFound(category: string): Product[] {
      return this.products.filter((prod) => prod.category === category);
  }

}
