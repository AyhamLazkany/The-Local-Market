import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(baseURL + 'users/' + username)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putUser(user: any): Observable<any> {
    return this.http.put<any>(baseURL + 'users/' + user.username, user, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteUser(username: string): Observable<any> {
    return this.http.put<any>(baseURL + 'users/' + username, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
}
