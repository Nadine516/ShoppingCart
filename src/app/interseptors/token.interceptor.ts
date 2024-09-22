import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const payload=localStorage.getItem('authToken')
   
    // const token=JSON.parse( payload || '')?.accessToken;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU1OTFiZGIxMDBmODVhMjg2MzZiNTkiLCJlbWFpbCI6Ik5hZGluZTEyQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyNjk5MTQzMywiZXhwIjo3Nzc0OTkxNDMzfQ.z2Cnwj5FpPZ6EvwkIz6AjvdUEsaEOYYeS5mUYZMgyVE';
    const res= request.clone({
      setHeaders:{
      Authorization:  token
      }
    })
   
    const finalToken=token?res:request
    return next.handle(finalToken);
  }
}
