import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { User } from '../1.Shared/user';
import { ProcessHttpMsgService } from './process-http-msg.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(baseURL + 'users/' + username)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(baseURL + 'users/' + id, user, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteUser(id: string): Observable<User> {
    return this.http.put<User>(baseURL + 'users/' + id, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
}
