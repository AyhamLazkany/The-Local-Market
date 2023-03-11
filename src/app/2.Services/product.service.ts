import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { Product } from '../1.Shared/product';
import { ProcessHttpMsgService } from './process-http-msg.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getProducts(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + `products?storeId=${storeId}`)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  postProducts(Product: Product): Observable<Product> {
    return this.http.post<Product>(baseURL + 'products', Product, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }


  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(baseURL + 'products/' + id)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putProduct(id: string, Product: Product): Observable<Product> {
    return this.http.put<Product>(baseURL + 'products/' + id, Product, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.put<Product>(baseURL + 'products/' + id, httpOptions)
    .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
