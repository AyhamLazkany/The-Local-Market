import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';

interface credentials {
  authToken: string | any;
  username: string | any;
  img: string | any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  isLogged!: Boolean;
  username!: string;
  img!: string;
  seller!: boolean;
  credentials!: credentials; 

  constructor(private authService: AuthService, @Inject('BaseURL') public baseURL: any) { };

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
      this.img = this.authService.getImg();
      this.authService.getUser(this.username)
        .subscribe((user) => this.seller = user.seller)
    }
  }

  onLogin() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
      this.img = this.authService.getImg();
    }
    }

  ngOnDestroy() {
    this.authService.destroyUserCredentials();
  }

  logout() {
    this.authService.logOut();
    setTimeout(() => {window.location.reload();}, 2000);
  }

}
