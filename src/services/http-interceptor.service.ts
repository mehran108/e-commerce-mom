import { Injectable, ViewChild } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { USER_TOKEN_INFO } from '../common/keys';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public storage: LocalstorageService,
    public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token: string = this.storage.get(USER_TOKEN_INFO);
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!(request.url === `${environment}/UploadFiles`)) {
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      request = request.clone({ headers: request.headers.set('x-application-key', 'AdminPortal') });
    } else {
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    // console.log(this.translate.currentLang);
    return next.handle(request)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            localStorage.clear();
            // this.router.navigate(['/Login']);
          }
          return throwError(error);
        }
      }));
  }
}
