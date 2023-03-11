import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '../1.Shared/store';
import { StoreService } from '../2.Services/store.service';

@Component({
  selector: 'app-shop',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  stores!: Store[];
  errMess!: string;

  constructor(private storeService: StoreService,
    @Inject('BaseURL') public baseURL: any) {}

  ngOnInit() {
    this.storeService.getStores()
    .subscribe(stores => this.stores = stores,
      errmess => this.errMess = <any>errmess);
  }

}
