import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) errMsg = error.error.message;
    else errMsg = `${error.status} - ${error.status}\nMessage: ${error.message}`;
    return throwError(() => {return errMsg});
  }

}
