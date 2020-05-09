import { Injectable, Injector } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

/**
* Intercepts all the errors that could occur on the system.
*/
@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private injector: Injector){}
  /**
   * Interceptor for errors in order to implement custom functionality.
   * 
   * @param {HttpRequest<any>} request request with the error
   * @param {HttpHandler} next http handler for pipe creation
   */ 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Remove in production if no use was found.
    // TODO: Define behavior, do not delete. Functionality that could surface in the future could be implemented here
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
      })
    );    
  }
}