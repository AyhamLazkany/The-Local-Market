import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../2.Services/favorite.service';
import { Product } from '../1.Shared/product';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Product[] = [];
  errMsg: string;

  constructor(@Inject('BaseURL') public baseURL: any, private FavSrv: FavoriteService) { }

  ngOnInit() {
    this.FavSrv.getFavorites()
      .subscribe((res) => {
        if (res.exists == true) this.favorites = res.favorites;
        else this.errMsg = 'There is no favorites found'
      }, (errMsg) => this.errMsg = errMsg);
  }

  removeFav(id: string) {
    this.FavSrv.deleteFavorite(id)
      .subscribe((res) => {
        if (res.success == true) {
          const index = this.favorites.findIndex((fav) => fav._id == id);
          if (index !== -1) this.favorites.splice(index, 1);
        } else {
          this.errMsg = 'Can not deleting';
        }
      });
  }

}
