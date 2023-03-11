import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { StoreService } from '../2.Services/store.service';

interface user { 
  _id: string,
  username: string,
  phone: string,
  email: string,
  img:string,
  seller: boolean
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: user;
  editedUser: any;
  storesNames!: string[];
  errMssg!: string; 

  constructor(@Inject('BaseURL') public baseURL: any, 
    private AuthSrv: AuthService,
    private storeServ: StoreService) { }

  ngOnInit() {
    this.AuthSrv.getUser(this.AuthSrv.getUsername())
      .subscribe((user) => this.user = user, (errMssg) => this.errMssg = <any>errMssg);
  }

  onSubmit() {
    this.AuthSrv.putUser(this.user.username, this.editedUser)
  }

  StoreOwner(): string | any {
    if (this.user.seller == false) return 'Don\'t have any store';
    else {
      this.storeServ.getStoreNameByOwner(this.user._id).subscribe((names) => this.storesNames = names);
      return this.storesNames[0];
    };
  }

}
