import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  credentials!: credentials; 

  constructor(private authService: AuthService) { };

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
    }
  }

  onLogin() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
    }
    }

  ngOnDestroy() {
    this.authService.destroyUserCredentials();
  }

  logout() {
    this.authService.logOut();
    this.isLogged = false;
  }

}
