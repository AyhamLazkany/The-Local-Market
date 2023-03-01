import { Injectable } from '@angular/core';
import { SaleRec } from '../1.Shared/sale-rec';
import { SaleRecExists } from '../1.Shared/sale-rec-exsits';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class SaleRecService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getSaleRecs(): Observable<SaleRec> {
    return this.http.get<SaleRec>(baseURL + 'saleRecs')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  isSaleRec(id: string): Observable<SaleRecExists | any> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, SaleRecs: null });
    }
    return this.http.get<SaleRecExists>(baseURL + 'saleRecs/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postSaleRec(id: string) {
    return this.http.post(baseURL + 'saleRecs/' + id, {})
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteSaleRec(id: string) {
    return this.http.delete(baseURL + 'saleRecs/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
