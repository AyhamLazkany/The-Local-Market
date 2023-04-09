import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

interface AuthResponse {
  status: string;
  success: string;
  token: string;
  user: any;
}

interface credentials {
  authToken: string | any;
  username: string | any;
  img: string | any;
}

interface JWTResponse {
  success: Boolean;
  status: string;
  user: any;
}
interface CanResponse {
  success: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TokenKey: string = "JWT";
  Credentials: credentials | any = localStorage.getItem(this.TokenKey);
  isAuthenticated: Boolean = false;
  authToken: string | any = undefined;
  username: string | any = undefined;
  img: string | any = undefined;

  constructor(private http: HttpClient,
    private ProcessHttpMsgService: ProcessHttpMsgService) {
  }

  getUsername(): string {
    return this.username;
  }

  getImg(): string {
    return this.img;
  }

  getToken(): string {
    return this.authToken;
  }

  useCredentials(credentials: credentials) {
    this.isAuthenticated = true;
    this.username = credentials.username;
    this.authToken = credentials.authToken;
    this.img = credentials.img;
  }

  destroyUserCredentials() {
    this.isAuthenticated = false;
    this.authToken = undefined;
    this.username = undefined;
    this.img = undefined;
    localStorage.removeItem(this.TokenKey);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(this.Credentials);
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    };
  }

  storeUserCredentials(credentials: credentials) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.TokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
      .subscribe(res => {
        console.log('JWT Token Valid: ', res);
        this.username = res.user.username;
      }, err => {
        console.log('JWT Token invalid: ', err);
        this.destroyUserCredentials();
      });
  }

  signUp(user: any): Observable<any> {
    return this.http.post<JWTResponse>(baseURL + 'users/signup',
      { 'username': user.username, 'password': user.password, 'email': user.email, 'phone': user.phone })
      .pipe(map((res) => {
        if (res.success == true)
          return { success: res.success, status: 'Signup successfully', user: res.user };
        else
          return { success: res.success, status: res.status };
      }), catchError(error => this.ProcessHttpMsgService.handleError(error)));
  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      { 'username': user.username, 'password': user.password })
      .pipe(map(res => {
        this.storeUserCredentials({ username: res.user.username, authToken: res.token, img: res.user.img });
        return { success: res.success, status: res.status, user: res.user };
      }), catchError(error => this.ProcessHttpMsgService.handleError(error)));
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(baseURL + 'users/' + username)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
  putUser(_id: string, user: any): Observable<any> {
    return this.http.put<any>(baseURL + 'users/editUser/' + _id, user, httpOptions)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
  deleteUser(_id: string): Observable<any> {
    return this.http.delete<any>(baseURL + 'users/deleteUser/' + _id, httpOptions)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  usernameChange(username: string): Observable<CanResponse> {
    return this.http.get<CanResponse>(baseURL + `users?username=${username}`)
      .pipe(map((res) => {
        return { success: res.success, status: 'This username used by anthor user' };
      }));
  }
  emailChange(email: string): Observable<CanResponse> {
    return this.http.get<CanResponse>(baseURL + `users?email=${email}`)
      .pipe(map((res) => {
        return { success: res.success, status: 'This email used by anthor user' };
      }));
  }
  phoneChange(phone: string): Observable<CanResponse> {
    return this.http.get<CanResponse>(baseURL + `users?phone=${phone}`)
      .pipe(map((res) => {
        return { success: res.success, status: 'This phone number used by anthor user' };
      }));
  }
}