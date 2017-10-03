import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { NUTRITIONIX_CONFIG } from '../shared/config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
    HttpHeaderResponse |
    HttpProgressEvent |
    HttpResponse<any> |
    HttpUserEvent<any>> {
    // console.log('Intercepted', req);
    const copiedReq = req.clone({
      headers: req.headers
        .append(NUTRITIONIX_CONFIG.appIdHeader, NUTRITIONIX_CONFIG.appId)
        .append(NUTRITIONIX_CONFIG.appKeyHeader, NUTRITIONIX_CONFIG.appKey)
    });
    // return next.handle(req);
    return next.handle(copiedReq);
  }

}
