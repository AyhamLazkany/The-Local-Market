import { Component, Inject, Input, ViewChild } from '@angular/core';
import { Product } from '../1.Shared/product';
import { FavoriteService } from "../2.Services/favorite.service";
import { ShopCartService } from "../2.Services/shop-cart.service";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {

  @ViewChild('btnClose') btnClose: any;
  @Input() product!: Product;
  productErrMess!: string;
  favorite!: boolean;
  favErrMsg!: string;
  cartErrMsg!: string;
  SelectedSize!: string;

  constructor(@Inject('BaseURL') public baseURL: any,
    private favSrv: FavoriteService,
    private cartSrv: ShopCartService) { }

  isFav(id: string) {
    this.favSrv.getFavorite(id)
      .subscribe((res) => {
        console.log(res)
        if (res.exists == true) this.favorite = true;
        else this.favorite = false;
      });
  }

  addFavorite() {
    this.favSrv.postFavorite(this.product._id)
      .subscribe((res) => {
        if (res.success == true) this.favorite = true;
        else {
          this.favorite = false;
        }
      });
  }

  removeFavorite() {
    this.favSrv.deleteFavorite(this.product._id)
      .subscribe((res) => {
        if (res.success == true) this.favorite = false;
        else {
          this.favorite = true;
        }
      });
  }

  changeSize(e) {
    this.SelectedSize = e.target.value;
  }

  addToCart() {
    if (this.SelectedSize == undefined) {
      this.cartErrMsg = "Select the size first";
    } else {
      this.cartSrv.postCart(this.product._id, this.SelectedSize)
      .subscribe((res) => {
        if (res.success == true)
          this.btnClose.nativeElement.click();
        else {
          this.cartErrMsg = res.status;
        }
      }, (errMsg) => this.cartErrMsg = errMsg);
    }
  }

}
