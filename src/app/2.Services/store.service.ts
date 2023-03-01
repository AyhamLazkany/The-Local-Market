import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { Store } from '../1.Shared/store';
import { ProcessHttpMsgService } from './process-http-msg.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(baseURL + 'stores')
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  getStoresIds(): Observable<string[] | any> {
    return this.http.get<Store[]>(baseURL + 'stores')
      .pipe(map(stores => stores.map(store => store._id)))
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  postStores(store: Store): Observable<Store> {
    return this.http.post<Store>(baseURL + 'stores', store, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }


  getStore(id: string): Observable<Store> {
    return this.http.get<Store>(baseURL + 'stores/' + id)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putStore(id: string, store: Store): Observable<Store> {
    return this.http.put<Store>(baseURL + 'stores/' + id, store, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteStore(id: string): Observable<Store> {
    return this.http.put<Store>(baseURL + 'stores/' + id, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
