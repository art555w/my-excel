import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.token) {
      request = request.clone({
        setParams: {
          auth: this.authService.token
        }
      })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error]', error)
        if (error.status === 401) {
          this.authService.logout()
          this.router.navigate(['/table'], {
            queryParams: {
              authFailed: true
            }
          })
        }
        return throwError(() => error)
      })
    );
  }
}
