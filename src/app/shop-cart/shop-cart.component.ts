import { Component, OnInit, Inject } from '@angular/core';
import { ShopCartService } from "../2.Services/shop-cart.service";
import { Product } from '../1.Shared/product';

interface CartProd { product: Product, size: string }

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  cartProds: CartProd[] = [];
  total: number = 0;
  errMsg: string = '';

  constructor(@Inject('BaseURL') public baseURL: any, private cartSrv: ShopCartService) { }

  ngOnInit() {
    this.cartSrv.getCart()
      .subscribe((res) => {
        if (res.exists == true) {
          this.cartProds = res.Cart;
          for (let i = 0; i < this.cartProds.length; i++) this.total += this.cartProds[i].product.price;
        } else {
          this.errMsg = 'There is no products found in the cart';
        }
      }, (errMsg) => this.errMsg = errMsg);
  }

  removePro(id: string) {
    this.cartSrv.deleteFromCart(id)
      .subscribe((res) => {
        if (res.success == true) {
          const index = this.cartProds.findIndex((cartProd) => cartProd.product._id == id);
          if (index !== -1) this.cartProds.splice(index, 1);
        } else {
          this.errMsg = 'Can not deleting';
        }
      });
  }

  clearCart() {
    this.cartSrv.deleteCart()
      .subscribe((res) => {
        if (res.success == true) this.cartProds = [];
      });
  }
}
