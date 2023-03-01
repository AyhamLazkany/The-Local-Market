import { Injectable } from '@angular/core';
import { BayRec } from '../1.Shared/bay-rec';
import { BayRecExists } from '../1.Shared/bay-rec-exsits';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class BayRecService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getBayRecs(): Observable<BayRec> {
    return this.http.get<BayRec>(baseURL + 'bayRecs')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  isBayRec(id: string): Observable<BayRecExists | any> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, BayRecs: null });
    }
    return this.http.get<BayRecExists>(baseURL + 'bayRecs/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postBayRec(id: string) {
    return this.http.post(baseURL + 'bayRecs/' + id, {})
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteBayRec(id: string) {
    return this.http.delete(baseURL + 'bayRecs/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
