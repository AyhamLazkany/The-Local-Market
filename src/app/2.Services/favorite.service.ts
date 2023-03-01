import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favorite } from '../1.Shared/favorite';
import { FavoriteExists } from '../1.Shared/favorites-exists';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getFavorites(): Observable<Favorite> {
    return this.http.get<Favorite>(baseURL + 'favorites')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  isFavorite(id: string): Observable<FavoriteExists | any> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, favorites: null });
    }
    return this.http.get<FavoriteExists>(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postFavorite(id: string) {
    return this.http.post(baseURL + 'favorites/' + id, {})
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFavorite(id: string) {
    return this.http.delete(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
