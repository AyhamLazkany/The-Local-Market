import { Component, OnInit, OnDestroy, Inject, EventEmitter, Output } from '@angular/core';
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
  @Output() login = new EventEmitter<void>();

  constructor(private authService: AuthService, @Inject('BaseURL') public baseURL: any) { };

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
      this.img = this.authService.getImg();
      this.seller = this.authService.getSeller();
    }
  }

  onLogin() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
      this.img = this.authService.getImg();
      this.seller = this.authService.getSeller();
      this.login.emit();
    }
  }

  ngOnDestroy() {
    this.authService.destroyUserCredentials();
  }

  logout() {
    this.authService.logOut();
    setTimeout(() => { window.location.reload(); }, 500);
  }

}
