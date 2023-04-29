import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getCart(): Observable<any> {
    return this.http.get<any>(baseURL + 'cart')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postCart(id: string, size: string): Observable<any> {
    return this.http.post<any>(baseURL + 'cart/' + id, { size: size })
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFromCart(id: string): Observable<any> {
    return this.http.delete<any>(baseURL + 'cart/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteCart(): Observable<any> {
    return this.http.delete<any>(baseURL + 'cart')
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
