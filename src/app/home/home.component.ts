import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '../1.Shared/store';
import { AuthService } from '../2.Services/auth.service';
import { StoreService } from '../2.Services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isLogged: Boolean = this.authSrv.isLoggedIn();
  stores: Store[];

  constructor (private authSrv: AuthService,
    private storeSrv:StoreService, 
    @Inject('BaseURL') public baseURL: any) {}

  ngOnInit() {
    this.storeSrv.getStores().subscribe((stores) => this.stores = stores);
  }
}
