import { Injectable } from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor}
  from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/*Esta clase me serviría para colocar los tokens de seguridad en todas las llamadas*/
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('X-CustomAuthHeader','Este es mi token de seguridad')
        .set('X-Auth-Token','El otro valor de seguridad')
    });
    //console.log("new headers", clonedRequest.headers.keys(), clonedRequest.headers);
    return next.handle(clonedRequest)
  }

}
